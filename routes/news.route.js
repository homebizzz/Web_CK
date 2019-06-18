var express = require('express');
var newspaperModel = require('../models/news.model');
var userModel = require('../models/user.model');
var moment = require('moment');

var router = express.Router();

router.get('/', (req, res, next) => {
    if(res.locals.authUser != null)
    {
        Promise.all([
            newspaperModel.hot(),
            newspaperModel.allByCategory("Mobile"),
            newspaperModel.allByCategory("Laptop"),
            newspaperModel.allByCategory("AI"),
            newspaperModel.allByCategory("Camera"),
            newspaperModel.allByCategory("Design"),
            newspaperModel.allByNewPost(),
            newspaperModel.allByNewEach("Mobile"),
            newspaperModel.allByNewEach("Laptop"),
            newspaperModel.allByNewEach("AI"),
            newspaperModel.allByNewEach("Camera"),
            newspaperModel.allByNewEach("Design"),
            newspaperModel.allByPremium(),
            userModel.single(res.locals.authUser.Id),
    
            ]).then(([NoiBat, Mobiles, Laptops, AIs, Cameras, Designs, NewPosts, EachMobile, EachLaptop, EachAI, EachCamera, EachDesign,Premiums, Users]) => {
                NoiBat[0].Created_date = moment(NoiBat[0].Created_date).format('YYYY-MM-DD');
                NoiBat[1].Created_date = moment(NoiBat[1].Created_date).format('YYYY-MM-DD');
                NoiBat[2].Created_date = moment(NoiBat[2].Created_date).format('YYYY-MM-DD');
    
                Mobiles.forEach(mobile => {
                    mobile.Created_date = moment(mobile.Created_date).format('YYYY-MM-DD');
                });
    
                Laptops.forEach(laptop => {
                    laptop.Created_date = moment(laptop.Created_date).format('YYYY-MM-DD');
                });
    
                AIs.forEach(ai => {
                    ai.Created_date = moment(ai.Created_date).format('YYYY-MM-DD');
                });
    
                Cameras.forEach(camera => {
                    camera.Created_date = moment(camera.Created_date).format('YYYY-MM-DD');
                });
    
                Designs.forEach(design => {
                    design.Created_date = moment(design.Created_date).format('YYYY-MM-DD');
                });
    
                NewPosts.forEach(newpost => {
                    newpost.Created_date = moment(newpost.Created_date).format('YYYY-MM-DD');
                });
                //
                EachMobile.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachLaptop.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachAI.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachCamera.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachDesign.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
                //
                Premiums.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });

                if(Users[0].Permission==1)
                {
                    res.render('index', {
                        newspaper_TinNong: NoiBat[0],
                        newspaper_NoiBat1: NoiBat[1],
                        newspaper_NoiBat2: NoiBat[2],
                        
                        mobile0: Mobiles[0],
                        mobile1: Mobiles[1],
                        mobile2: Mobiles[2],
                        mobile3: Mobiles[3],
                        mobile4: Mobiles[4],
                        laptop1: Laptops[0],
                        laptop2: Laptops[1],
                        ai1: AIs[0],
                        ai2: AIs[1],
                        ai3: AIs[2],
                        ai4: AIs[3],
                        camera1: Cameras[0],
                        camera2: Cameras[1],
                        camera3: Cameras[2],
                        design1: Designs[0],
                        design2: Designs[1],
                        design3: Designs[2],
                        design4: Designs[3],
                        newPost: NewPosts,
        
                        eachMobile: EachMobile[0],
                        eachLaptop: EachLaptop[0],
                        eachAI: EachAI[0],
                        eachCamera: EachCamera[0],
                        eachDesign: EachDesign[0],

                        premium1: Premiums[0],
                        premium2: Premiums[1],
                        premium3: Premiums[2],
                        premium4: Premiums[3],
                        premium5: Premiums[4],

                        user: Users,
                        isAdmin: true,
                        isNotExpiryDate: true
                    });
                }
                else if(Users[0].Permission==2)
                {
                    console.log('so 2 sdfsdfdsfsdfdsfsd');
                    res.render('index', {
                        newspaper_TinNong: NoiBat[0],
                        newspaper_NoiBat1: NoiBat[1],
                        newspaper_NoiBat2: NoiBat[2],
                        
                        mobile0: Mobiles[0],
                        mobile1: Mobiles[1],
                        mobile2: Mobiles[2],
                        mobile3: Mobiles[3],
                        mobile4: Mobiles[4],
                        laptop1: Laptops[0],
                        laptop2: Laptops[1],
                        ai1: AIs[0],
                        ai2: AIs[1],
                        ai3: AIs[2],
                        ai4: AIs[3],
                        camera1: Cameras[0],
                        camera2: Cameras[1],
                        camera3: Cameras[2],
                        design1: Designs[0],
                        design2: Designs[1],
                        design3: Designs[2],
                        design4: Designs[3],
                        newPost: NewPosts,
        
                        eachMobile: EachMobile[0],
                        eachLaptop: EachLaptop[0],
                        eachAI: EachAI[0],
                        eachCamera: EachCamera[0],
                        eachDesign: EachDesign[0],

                        premium1: Premiums[0],
                        premium2: Premiums[1],
                        premium3: Premiums[2],
                        premium4: Premiums[3],
                        premium5: Premiums[4],

                        user: Users,
                        isWriter: true,
                        isNotExpiryDate: true
                    });
                }
                else if(Users[0].Permission==3)
                {
                    console.log('trtrwewewewaewaewa');
                    res.render('index', {
                        newspaper_TinNong: NoiBat[0],
                        newspaper_NoiBat1: NoiBat[1],
                        newspaper_NoiBat2: NoiBat[2],
                        
                        mobile0: Mobiles[0],
                        mobile1: Mobiles[1],
                        mobile2: Mobiles[2],
                        mobile3: Mobiles[3],
                        mobile4: Mobiles[4],
                        laptop1: Laptops[0],
                        laptop2: Laptops[1],
                        ai1: AIs[0],
                        ai2: AIs[1],
                        ai3: AIs[2],
                        ai4: AIs[3],
                        camera1: Cameras[0],
                        camera2: Cameras[1],
                        camera3: Cameras[2],
                        design1: Designs[0],
                        design2: Designs[1],
                        design3: Designs[2],
                        design4: Designs[3],
                        newPost: NewPosts,
        
                        eachMobile: EachMobile[0],
                        eachLaptop: EachLaptop[0],
                        eachAI: EachAI[0],
                        eachCamera: EachCamera[0],
                        eachDesign: EachDesign[0],

                        premium1: Premiums[0],
                        premium2: Premiums[1],
                        premium3: Premiums[2],
                        premium4: Premiums[3],
                        premium5: Premiums[4],

                        user: Users,
                        isEditor: true,
                        isNotExpiryDate: true
                    });
                }
                else
                {
                    var currentDate = moment();
                    var expiryDate = Users[0].Subscribe_date;
                    var isafter = moment(expiryDate).isAfter(currentDate);
                    if(isafter)
                    {
                        res.render('index', {
                            newspaper_TinNong: NoiBat[0],
                            newspaper_NoiBat1: NoiBat[1],
                            newspaper_NoiBat2: NoiBat[2],
                            
                            mobile0: Mobiles[0],
                            mobile1: Mobiles[1],
                            mobile2: Mobiles[2],
                            mobile3: Mobiles[3],
                            mobile4: Mobiles[4],
                            laptop1: Laptops[0],
                            laptop2: Laptops[1],
                            ai1: AIs[0],
                            ai2: AIs[1],
                            ai3: AIs[2],
                            ai4: AIs[3],
                            camera1: Cameras[0],
                            camera2: Cameras[1],
                            camera3: Cameras[2],
                            design1: Designs[0],
                            design2: Designs[1],
                            design3: Designs[2],
                            design4: Designs[3],
                            newPost: NewPosts,
            
                            eachMobile: EachMobile[0],
                            eachLaptop: EachLaptop[0],
                            eachAI: EachAI[0],
                            eachCamera: EachCamera[0],
                            eachDesign: EachDesign[0],
    
                            premium1: Premiums[0],
                            premium2: Premiums[1],
                            premium3: Premiums[2],
                            premium4: Premiums[3],
                            premium5: Premiums[4],
    
                            user: Users,
                            isSubscriber: true,
                            isNotExpiryDate: true
                        });
                    }
                    else{
                        res.render('index', {
                            newspaper_TinNong: NoiBat[0],
                            newspaper_NoiBat1: NoiBat[1],
                            newspaper_NoiBat2: NoiBat[2],
                            
                            mobile0: Mobiles[0],
                            mobile1: Mobiles[1],
                            mobile2: Mobiles[2],
                            mobile3: Mobiles[3],
                            mobile4: Mobiles[4],
                            laptop1: Laptops[0],
                            laptop2: Laptops[1],
                            ai1: AIs[0],
                            ai2: AIs[1],
                            ai3: AIs[2],
                            ai4: AIs[3],
                            camera1: Cameras[0],
                            camera2: Cameras[1],
                            camera3: Cameras[2],
                            design1: Designs[0],
                            design2: Designs[1],
                            design3: Designs[2],
                            design4: Designs[3],
                            newPost: NewPosts,
            
                            eachMobile: EachMobile[0],
                            eachLaptop: EachLaptop[0],
                            eachAI: EachAI[0],
                            eachCamera: EachCamera[0],
                            eachDesign: EachDesign[0],
    
                            premium1: Premiums[0],
                            premium2: Premiums[1],
                            premium3: Premiums[2],
                            premium4: Premiums[3],
                            premium5: Premiums[4],
    
                            user: Users,
                            isSubscriber: true
                        });
                    }
                }
                
        }).catch(next);
    }  
    else
    {
        Promise.all([
            newspaperModel.hot(),
            newspaperModel.allByCategory("Mobile"),
            newspaperModel.allByCategory("Laptop"),
            newspaperModel.allByCategory("AI"),
            newspaperModel.allByCategory("Camera"),
            newspaperModel.allByCategory("Design"),
            newspaperModel.allByNewPost(),
            newspaperModel.allByNewEach("Mobile"),
            newspaperModel.allByNewEach("Laptop"),
            newspaperModel.allByNewEach("AI"),
            newspaperModel.allByNewEach("Camera"),
            newspaperModel.allByNewEach("Design")
    
            ]).then(([NoiBat, Mobiles, Laptops, AIs, Cameras, Designs, NewPosts, EachMobile, EachLaptop, EachAI, EachCamera, EachDesign]) => {
                NoiBat[0].Created_date = moment(NoiBat[0].Created_date).format('YYYY-MM-DD');
                NoiBat[1].Created_date = moment(NoiBat[1].Created_date).format('YYYY-MM-DD');
                NoiBat[2].Created_date = moment(NoiBat[2].Created_date).format('YYYY-MM-DD');
    
                Mobiles.forEach(mobile => {
                    mobile.Created_date = moment(mobile.Created_date).format('YYYY-MM-DD');
                });
    
                Laptops.forEach(laptop => {
                    laptop.Created_date = moment(laptop.Created_date).format('YYYY-MM-DD');
                });
    
                AIs.forEach(ai => {
                    ai.Created_date = moment(ai.Created_date).format('YYYY-MM-DD');
                });
    
                Cameras.forEach(camera => {
                    camera.Created_date = moment(camera.Created_date).format('YYYY-MM-DD');
                });
    
                Designs.forEach(design => {
                    design.Created_date = moment(design.Created_date).format('YYYY-MM-DD');
                });
    
                NewPosts.forEach(newpost => {
                    newpost.Created_date = moment(newpost.Created_date).format('YYYY-MM-DD');
                });
                
                EachMobile.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachLaptop.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachAI.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachCamera.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
    
                EachDesign.forEach(temp => {
                    temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
                });
                //
                
                res.render('index', {
                    newspaper_TinNong: NoiBat[0],
                    newspaper_NoiBat1: NoiBat[1],
                    newspaper_NoiBat2: NoiBat[2],
                    
                    mobile0: Mobiles[0],
                    mobile1: Mobiles[1],
                    mobile2: Mobiles[2],
                    mobile3: Mobiles[3],
                    mobile4: Mobiles[4],
                    laptop1: Laptops[0],
                    laptop2: Laptops[1],
                    ai1: AIs[0],
                    ai2: AIs[1],
                    ai3: AIs[2],
                    ai4: AIs[3],
                    camera1: Cameras[0],
                    camera2: Cameras[1],
                    camera3: Cameras[2],
                    design1: Designs[0],
                    design2: Designs[1],
                    design3: Designs[2],
                    design4: Designs[3],
                    
                    newPost: NewPosts,
    
                    eachMobile: EachMobile[0],
                    eachLaptop: EachLaptop[0],
                    eachAI: EachAI[0],
                    eachCamera: EachCamera[0],
                    eachDesign: EachDesign[0],
                });
        }).catch(next);
    }
    
})

module.exports = router;