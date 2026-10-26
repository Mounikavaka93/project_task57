export function bmiFromMetric(cm, kg) {
  const meters = cm / 100
  return kg / (meters * meters)
}

export function bmiFromImperial(feet, inches, pounds) {
  const totalInches = feet * 12 + inches
  return (703 * pounds) / (totalInches * totalInches)
}

export function bmiBand(bmi) {
  if (bmi < 18.5) {
    return {
      id: 'under',
      label: 'Underweight',
      copy: 'Below 18.5. A screening hint to look at fueling and strength, not a diagnosis.',
    }
  }
  if (bmi < 25) {
    return {
      id: 'healthy',
      label: 'Healthy range',
      copy: '18.5 to 24.9. The general adult screening band used by most BMI charts.',
    }
  }
  if (bmi < 30) {
    return {
      id: 'over',
      label: 'Overweight',
      copy: '25 to 29.9. Training and meals can move this number over time.',
    }
  }
  return {
    id: 'obese',
    label: 'Obese range',
    copy: '30 or higher. A screening flag — a clinician can interpret it for you.',
  }
}

export function roundBmi(value) {
  return Math.round(value * 10) / 10
}
