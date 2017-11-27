/**
 * Created by wmcclellan on 7/20/2015.
 */
var mongoose = require('mongoose');

exports.initialize = function() {
    'use strict';

    function MakeMenu() {
        var menu = mongoose.model('menus');
        var menuItem = mongoose.model('menuItems');

        menu.count().exec(function (err, count) {
            //populate menus with default data

            if (count == 0) {
                var Admin = new menuItem({
                    text: 'Admin',
                    icon: 'fa fa-gear',
                    path: '',
                    role:'admin',
                    group:[]
                });

                var Users = new menuItem({
                    text: 'Users',
                    icon: 'fa fa-gear',
                    path: 'admin',
                    role:'admin',
                    group:[]
                });

                var Roles = new menuItem({
                    text: 'Roles',
                    icon: 'fa fa-gear',
                    path: 'roles',
                    role:'admin',
                    group:[]
                });
                var mymenuItems = [];

                Admin.group.push(Users);
                Admin.group.push(Roles);
                mymenuItems.push(Admin);

                for (var i = 0;i < 3;i++) {
                    var newmenuItem = new menuItem({
                        text: 'menu' + i.toString(),
                        icon: 'fa fa-gear',
                        path: 'home',
                        group:[]
                    })
                    mymenuItems.push(newmenuItem);
                }
                var newmenu = new menu({
                    name:'main',
                    menuItems:mymenuItems
                });

                newmenu.save();

                var titlemenuItem = new menuItem({
                    text: 'About',
                    icon: 'fa fa-home',
                    path: 'home.about',
                    group:[]
                })

                var mytitlemenuitems = [];

                mytitlemenuitems.push(titlemenuItem);
                var titlemenu = new menu({
                    name:'title',
                    menuItems:titlemenuItem
                });
                titlemenu.save();

                var myprofilemenuitems = [];

                myprofilemenuitems.push(new menuItem({
                    text: 'profile',
                    icon: 'fa fa-home',
                    path: 'profile',
                    group:[]
                }));
                myprofilemenuitems.push(new menuItem({
                    text: 'Admin',
                    icon: 'fa fa-home',
                    path: 'admin',
                    role:'admin',
                    group:[]
                }));

                var profilemenu = new menu({
                    name:'admin',
                    menuItems:myprofilemenuitems
                });
                profilemenu.save();

            }
        });

    }

    function MakeAdminUser() {
        var UserFunctions = require('../utilities/UserFunctions.js');
        var usercount = require('mongoose').model('User');
        usercount.count().exec(function (err, count) {
            if (count == 0) {
                UserFunctions.CreateNewUser('admin', 'admin', 'admin', 'admin', 'admin',['admin'],
                    function (user) {
                        console.log(user);
                    });

            }
        });
    }
    MakeAdminUser();
    MakeMenu();

}

