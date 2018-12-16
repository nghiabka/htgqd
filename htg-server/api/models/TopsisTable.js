var envVariableMetadata = require('../../config/envVariableMetadata');
module.exports = {
    tableName: 'topsis_table',
    attributes: {
        university_name: { type: 'string'},
        department_name: { type: 'string'},
        department_code: { type: 'string'},
        // bien moi truong
        group_code: { type: 'string'},
        area: { type: 'number' },
        university_avg_score: { type: 'number' },
        tuition: { type: 'number' },
        hobby_name: { type: 'string'},
        subject_name: { type: 'string'},
        department_avg_score: { type: 'number' },
        note: { type: 'string'},
    },
    getRecommended: async (params) => {
        var topsisTable = await this.find();
        var normalizedDecisionMatrix = this.normalizeTopsisTable(topsisTable);
        var weightedNormalizedDesisionMatrix = this.weightedDesisionMatrix(normalizedDecisionMatrix);
        var bestWorstValueObject = this.getBestWorstValue(weightedNormalizedDesisionMatrix);
    },

    normalizeField: (topsisTableColumnData, fieldValueInParams, metaData) => {
        var totalOfPower2 = _.reduce(topsisTableColumnData, (prev, current) => {
            if (metaData.isNumber && metaData.isNormalized) return prev + current * current;
            else if (metaData.isNumber && !metaData.isNormalized) return prev + Math(fieldValueInParams - current, 2);
            else 1;
        }, 0)

         
    },

    weightedDesisionMatrix: (decisionMatrix) => {

    }

};
  
  