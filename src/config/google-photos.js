exports.googlePhotosOptions = {
  albumsTitles: [
    "cedricdelpoux.fr",
    "cedricdelpoux.fr/sport",
    "cedricdelpoux.fr/travel/iceland",
    "cedricdelpoux.fr/travel/france/reunion",
    ...(!process.env.MINIMAL
      ? [
          "cedricdelpoux.fr/travel/austria",
          "cedricdelpoux.fr/travel/belgium",
          "cedricdelpoux.fr/travel/bosnia",
          "cedricdelpoux.fr/travel/croatia",
          "cedricdelpoux.fr/travel/czechia",
          "cedricdelpoux.fr/travel/denmark",
          "cedricdelpoux.fr/travel/france/bretagne",
          "cedricdelpoux.fr/travel/france/corsica",
          "cedricdelpoux.fr/travel/hungary",
          "cedricdelpoux.fr/travel/indonesia",
          "cedricdelpoux.fr/travel/ireland",
          "cedricdelpoux.fr/travel/italy",
          "cedricdelpoux.fr/travel/jordan",
          "cedricdelpoux.fr/travel/luxembourg",
          "cedricdelpoux.fr/travel/netherlands",
          "cedricdelpoux.fr/travel/new-zealand",
          "cedricdelpoux.fr/travel/peru",
          "cedricdelpoux.fr/travel/singapore",
          "cedricdelpoux.fr/travel/spain/tenerife",
          "cedricdelpoux.fr/travel/sweden",
          "cedricdelpoux.fr/travel/united-kingdom",
        ]
      : []),
  ],
  albumsUpdate: (album) => {
    const [, category, country, region] = album.title.split("/")
    return {
      ...album,
      category,
      country,
      region,
    }
  },
  photosMaxWidth: process.env.MINIMAL ? 300 : 680,
  debug: process.env.DEBUG,
}
