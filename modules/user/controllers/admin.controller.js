/**
 * User CRUD Controller
 * 
 * @by rafaat
 * @since 1.0
 */


const UserRepo = require('../repositories/user.repository');
/* Router Methods */

exports.Index = async (req, res, next) => {
    var query = { role: 'partner' },
        page = 1,
        size = 100;

    if ('page' in req.query) page = parseInt(req.query.page);
    if ('size' in req.query) size = parseInt(req.query.size);

    if ('tag' in req.query) {
        if (req.query.tag.length > 0) {
            query['tags'] = req.query.tag;
        }
    }

    if ('query' in req.query) {
        if (req.query.query.length > 0) {
            query['$or'] = [
                { name: new RegExp(req.query.query, "i") },
                { "local.phone": new RegExp(req.query.query, "i") },
            ]
        }
    }

    try {
        let partners = await UserRepo.PartnerIndex(query, page, size);
        let shops = await ShopRepo.Index({}, page, size);
        let options = {
            title: 'Admin',
            partners,
            shops
        }

        if (req.session.flash) options['flashMessage'] = req.session.flash;
        req.session.flash = undefined;

        return res.render('admin/index.pug', options);

    } catch (error) {
        console.error(error);
        return next(error);
    }

};


exports.AddPartner = async (req, res, next) => {
    let body = req.body;
    try {
        let partner = await UserRepo.Create(body);
        if (shortUrl) {
            partner.referralUrl = shortUrl
            await partner.save();
        }
        req.session.flash = { class: 'alert-success', message: "Partner created" };
        return res.redirect('/admin');
    } catch (error) {
        console.error(error);
        req.session.flash = { class: 'alert-danger', message: error.message };
        return res.redirect('/admin');
    }
}

exports.EditPartner = async (req, res, next) => {
    let partner = req.model;
    Object.assign(partner, req.body);

    try {
        await partner.save();
        req.session.flash = { class: 'alert-success', message: "Partner updated." };
        return res.redirect('/admin');
    } catch (error) {
        console.error(error);
        req.session.flash = { class: 'alert-danger', message: error.message };
        return res.back();
    }
}


exports.Single = function (req, res, next) {

    return res.json(req.model);

};

