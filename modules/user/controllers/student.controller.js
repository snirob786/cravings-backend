/**
 * User Profile Controller
 * 
 * @by rafaat
 * @since 1.0
 */


/* Router Methods */

exports.Dashboard = async (req, res, next) => {
    let shops;
    try {
        shops = await ShopRepo.Index({
            partnerID: req.user._id
        }, 1, 100)
    } catch (error) {
        console.log(error);
        shops = [];
    }

    let options = {
        title: 'Dashboard',
        user: req.user,
        shops
    }
    return res.render('partner/index.pug', options)
}

exports.Details = async (req, res, next) => {

    try {
        let user = await UserRepo.Single({ _id: req.user._id });
        if (!user) return next();
        return res.json(user.toJSON())
    } catch (error) {
        console.error(error);
        return next(error);
    }

}

exports.Update = async (req, res, next) => {

    try {
        let user = await UserRepo.Single({ _id: req.user._id });
        if (!user) return next();

        let { local, ...body } = req.body;
        user = Object.assign(user, body);
        user = await user.save();

        return res.json(user.toJSON())
    } catch (error) {
        console.error(error);
        return next(error);
    }

}