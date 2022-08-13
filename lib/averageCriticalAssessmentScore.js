let averageCriticalAssessmentScore = (image) =>
  image.imagesToRate.reduce(
    (acc, x) => (acc + x.criticalAssessmentScore, 0) / image.imagesToRate.length
  )

export default averageCriticalAssessmentScore
