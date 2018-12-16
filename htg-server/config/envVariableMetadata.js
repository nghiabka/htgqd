module.exports = {
    group_code:           {weight: 0.125, isNumber: false, isNormalized: false, isBiggerIsBest: true },
    area:                 {weight: 0.125, isNumber: true,  isNormalized: false, isBiggerIsBest: false},
    university_avg_score: {weight: 0.125, isNumber: true,  isNormalized: false, isBiggerIsBest: false},
    tuition:              {weight: 0.125, isNumber: true,  isNormalized: true,  isBiggerIsBest: false},
    hobby_name:           {weight: 0.125, isNumber: false, isNormalized: false, isBiggerIsBest: true },
    subject_name:         {weight: 0.125, isNumber: false, isNormalized: false, isBiggerIsBest: true },
    department_avg_score: {weight: 0.125, isNumber: true,  isNormalized: false, isBiggerIsBest: false},
}