let allMessages = [];

module.exports = {
    getAllMessages: (req, res) => {
        res.status(200).send(allMessages);
    }
    , 
    createMessages: (req, res) => {
        let newMessage = {
            username: req.body.username,
            message: req.body.message
        }
        allMessages.push(newMessage);
        if (req.session.history) {
            req.session.history.push(newMessage);
        } else { // first time someone interact
            req.session.history = [];
            req.session.history.push(newMessage);
        }
        res.status(200).send(allMessages);
    }
    ,
    history: (req, res) => {
        res.status(200).send(req.session.history);
    }
}