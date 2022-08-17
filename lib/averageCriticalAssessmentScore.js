let averageCriticalAssessmentScore = (image) => {
  return image.imagesToRate.reduce((acc, x) => {
    return acc + x.criticalAssessmentScore / image.imagesToRate.length
  }, 0)
}

export default averageCriticalAssessmentScore
