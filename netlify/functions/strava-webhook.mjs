// Receives the events of the Strava webhook subscription, and starts the
// GitHub Actions workflow that builds and deploys the site.
// https://developers.strava.com/docs/webhooks/

const REPOSITORY = "cedricdelpoux/cedricdelpoux.fr"
const ATHLETE_ID = "229804"

// Strava gives up on a callback after 2 seconds
const DISPATCH_TIMEOUT_MS = 1500

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {"content-type": "application/json"},
  })

// Strava checks the callback URL when the subscription is created: it sends
// back the challenge, as long as the verify token is the one given then
const verify = (url) => {
  const mode = url.searchParams.get("hub.mode")
  const token = url.searchParams.get("hub.verify_token")
  const challenge = url.searchParams.get("hub.challenge")

  if (
    mode !== "subscribe" ||
    token !== process.env.STRAVA_WEBHOOK_VERIFY_TOKEN
  ) {
    return json({error: "Forbidden"}, 403)
  }

  return json({"hub.challenge": challenge})
}

const dispatch = (event) =>
  fetch(`https://api.github.com/repos/${REPOSITORY}/dispatches`, {
    method: "POST",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${process.env.GITHUB_DISPATCH_TOKEN}`,
      "x-github-api-version": "2022-11-28",
    },
    body: JSON.stringify({
      event_type: "strava-activity",
      client_payload: {
        aspect_type: event.aspect_type,
        object_id: String(event.object_id),
      },
    }),
    signal: AbortSignal.timeout(DISPATCH_TIMEOUT_MS),
  })

export default async (req) => {
  const url = new URL(req.url)

  if (req.method === "GET") {
    return verify(url)
  }

  if (req.method !== "POST") {
    return json({error: "Method not allowed"}, 405)
  }

  const event = await req.json().catch(() => null)

  // Strava does not sign its events: at least, only the activities of this
  // site's athlete start a build
  if (!event || String(event.owner_id) !== ATHLETE_ID) {
    return json({error: "Unknown athlete"}, 403)
  }

  // The athlete events (an app deauthorized) change nothing on the site
  if (event.object_type !== "activity") {
    return json({ignored: event.object_type})
  }

  // Strava sends the event again when the callback does not answer 200, so
  // a failed dispatch is reported as such
  const response = await dispatch(event).catch((e) => ({
    ok: false,
    status: e.name,
  }))

  if (!response.ok) {
    console.error(`GitHub dispatch failed: ${response.status}`)
    return json({error: "Dispatch failed"}, 502)
  }

  return json({dispatched: event.aspect_type, activity: event.object_id})
}
