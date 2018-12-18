module.exports = {
    index: async function(req, res) {
        try {
            try {
                let allOptions = await Promise.all([
                    University.find().sort('name asc'),
                    Hobby.find().sort('name asc'),
                    Group.findAll(),
                    Subject.find().sort('name asc'),
                    Department.find().sort('name asc'),
                ])
    
                let universities = allOptions[0];
                let hobbies = allOptions[1];
                let groups = allOptions[2];
                let subjects = allOptions[3];
                let departments = allOptions[4];
                let departmentsGroupByUniversityId = _.groupBy(departments, d => d.university_id);
                universities = _.map(universities, u => {
                    u.departments = departmentsGroupByUniversityId[u.id];
                    return u;
                })

                let dataResponse = { universities: universities, hobbies: hobbies, groups: groups, subjects: subjects };
           
                return res.view('pages/form_input.ejs', {allOptions: dataResponse});
            } catch (error) {
                console.log('error', error);
                return res.json({ status: 0, message: error.message });
            }
            
        } catch (error) {
            console.log('error', error);
            res.json({ status: 0, message: error.message });
        }
    }
}