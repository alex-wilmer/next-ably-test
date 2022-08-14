let averageCriticalAssessmentScore = (image) => {
  if (!image?.imagesToRate?.length) return
  return image.imagesToRate.reduce(
    (acc, x) =>
      (acc + x.criticalAssessmentScore, 0) / image.imagesToRate.length,
    0
  )
}

export default averageCriticalAssessmentScore
