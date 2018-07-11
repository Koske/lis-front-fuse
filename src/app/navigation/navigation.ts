import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'actions',
        title    : 'Actions',
        type     : 'group',
        children : [
            {
                id       : 'dashboards',
                title    : 'Project',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'addProject',
                        title: 'Add Project',
                        icon : 'add_box',
                        type : 'item',
                        url  : 'new-project'
                    },
                    {
                        id   : 'allProjects',
                        title: 'All Projects',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'project'
                    }
                ]
            },
            {
                id       : 'dashboards',
                title    : 'Users',
                type     : 'collapsable',
                icon     : 'group',
                children : [
                    {
                        id   : 'addUser',
                        title: 'Add User',
                        icon : 'group_add',
                        type : 'item',
                        url  : 'register'
                    },
                    {
                        id   : 'allUsers',
                        title: 'All Users',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'users'
                    }
                ]
            }
        ]
    }
];
    // {
    //     id       : 'applications',
    //     title    : 'Applications',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'project',
    //             title    : 'Project',
    //             type     : 'item',
    //             icon     : 'assignment',
    //             url      : '/sample',
    //             badge    : {
    //                 title    : '25',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // }