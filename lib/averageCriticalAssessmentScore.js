let averageCriticalAssessmentScore = (image) =>
  image.imagesToRate.reduce(
    (acc, x) =>
      (acc + x.criticalAssessmentScore, 0) / image.imagesToRate.length,
    0
  )

export default averageCriticalAssessmentScore
