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
        university_favorite_score: { type: 'number' },
        tuition: { type: 'number' },
        hobby_name: { type: 'string'},
        subject_name: { type: 'string'},
        department_entrance_score: { type: 'number' },
        note: { type: 'string'},
    },
    getRecommended: async (params) => {
     
        var localEnvVariableMetadata = Object.assign({}, envVariableMetadata);
        var condition = {};
        if (params.group_code) {
            condition.group_code = params.group_code;
        }
        var topsisTable = await TopsisTable.find(condition);
        var topsis_table_size = topsisTable.length;
     
        for (let i in localEnvVariableMetadata) {
            localEnvVariableMetadata[i].data = _.map(topsisTable, t => {
       
                if (localEnvVariableMetadata[i].isNumber) {
                    if (localEnvVariableMetadata[i].isNormalized) return t[i];
                    else {
                        return Math.abs((parseFloat(t[i]) || 0) - (parseFloat(params[i]) || 0));}
                } else {
                    if (i == 'university_favorite_score') {
                        if (params[i]) {
                            return params[i] == t.university_name ? 1 : 0; 
                        } else {
                            t[i];
                        }
                    } else if (i == 'tuition') {
                        
                        if (params[i] == 'yes') {
                            return t[i];
                        } else {
                            return 0;
                        }
                    } else {
                        if (params[i] == t[i]) return 1
                        else return 0;
                    }
                }
                
            });
          
            localEnvVariableMetadata[i].can_2_total_power_2_all_elements = Math.sqrt(_.reduce(localEnvVariableMetadata[i].data, (prev, curr) => {
                return prev + curr * curr;
            }, 0));

            localEnvVariableMetadata[i].data = _.map(localEnvVariableMetadata[i].data, e => {
                if (!localEnvVariableMetadata[i].can_2_total_power_2_all_elements) return 0;
                return (e * localEnvVariableMetadata[i].weight) / localEnvVariableMetadata[i].can_2_total_power_2_all_elements
            });

            if (localEnvVariableMetadata[i].isBiggerIsBest) {
                localEnvVariableMetadata[i].bestValue = _.max(localEnvVariableMetadata[i].data);
                localEnvVariableMetadata[i].worstValue = _.min(localEnvVariableMetadata[i].data);
            } else {
                localEnvVariableMetadata[i].worstValue = _.max(localEnvVariableMetadata[i].data);
                localEnvVariableMetadata[i].bestValue = _.min(localEnvVariableMetadata[i].data);
            }
        }
        // console.log(topsisTable);
        // console.log(localEnvVariableMetadata);
        var tmp_s_plus = [];

        for (let i = 0; i < topsis_table_size; i ++) {
            let sum_of_power_2 = 0;
            for (let j in envVariableMetadata) {
                sum_of_power_2 += Math.pow(localEnvVariableMetadata[j].data[i] - localEnvVariableMetadata[j].bestValue, 2);
            }
            tmp_s_plus[i] = Math.sqrt(sum_of_power_2);
        }
        
        var tmp_s_sub = [];

        for (let i = 0; i < topsis_table_size; i ++) {
            let sum_of_power_2 = 0;
            for (let j in envVariableMetadata) {
                sum_of_power_2 += Math.pow(localEnvVariableMetadata[j].data[i] - localEnvVariableMetadata[j].worstValue, 2);
            }
            tmp_s_sub[i] = Math.sqrt(sum_of_power_2);
        }

        localEnvVariableMetadata.s_plus = tmp_s_plus;
        localEnvVariableMetadata.s_sub  = tmp_s_sub;

        var ranks = [];
        for (let i = 0; i < topsis_table_size; i ++) {
            ranks[i] = tmp_s_sub[i] + tmp_s_plus[i] ? tmp_s_sub[i] / ( tmp_s_sub[i] + tmp_s_plus[i] ) : 1;
        }
                
        topsisTable = _.map(topsisTable, (e, index) => {
            e.rank_value = ranks[index];
            return e;
        })
     
        topsisTable = _.sortBy(topsisTable, e => - e.rank_value);
        topsisTable = _.groupBy(topsisTable, e => {
            return e.university_name + e.department_name + e.group_code;
        })
        topsisTable = _.map(topsisTable, e => {
            return e[0];
        })

        return topsisTable.length < 100 ? topsisTable : topsisTable.slice(0, 100);
    }
};
  
  