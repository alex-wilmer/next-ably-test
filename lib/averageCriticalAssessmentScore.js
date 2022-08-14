let averageCriticalAssessmentScore = (image) => {
  return image.imagesToRate.reduce(function (acc, x) {
    return (acc + x.criticalAssessmentScore, 0) / image.imagesToRate.length
  }, 0)
}

export default averageCriticalAssessmentScore
