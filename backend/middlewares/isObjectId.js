const { isValidObjectId } = require("mongoose");

module.exports = (req, res, next) => {
    // get queries
    const queryObj = { ...req.query };

    // filter object properties based on regex pattern
    const filteredQueries = Object.entries(queryObj).reduce((acc, [key]) => {
        const regex = /\w*Id\b/;
        if (regex.test(key.toString())) {
            acc[key] = queryObj[key] 
        }
        return acc;
    }, {}); // acc = accumulator
    
    //
    let sentProperties = 0; // if any property has value its value will increase one( +1 )
    let validatedProperties = 0; // if any property validated(true) its value will increase one( +1 )

    for (const key in filteredQueries) {
        if (req.query[key]) {
            sentProperties += 1;

            if (isValidObjectId(req.query[key])) {
                validatedProperties += 1;
            }
        }
    }

    if (sentProperties === validatedProperties) {
        next();
    } else {
        res.status(422).send({ message: "invalid id" });
    }
};
