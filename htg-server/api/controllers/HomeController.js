module.exports = {
    index: async function(req, res) {
        try {
            let deparments = await Department.find();
            console.log('dapartments', deparments);
            res.json({ status: 1, message: 'Hello world!', data: deparments });
        } catch (error) {
            console.log('error', error);
            res.json({ status: 0, message: error.message });
        }
    }
}