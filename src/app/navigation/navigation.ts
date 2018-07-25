import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'AdminPanel',
        title    : 'Admin Panel',
        type     : 'group',
        children : [
            {
                id       : 'project',
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
                    },
                    {
                        id   : 'addProjectType',
                        title: 'Add Project Type',
                        icon: 'class',
                        type : 'item',
                        url  : 'new-project-type'
                    },
                    {
                        id   : 'allProjectTypes',
                        title: 'All Project Types',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'project-types'
                    },
                    {
                        id   : 'addParticipantType',
                        title: 'Add Participant Type',
                        icon: 'accessibility',
                        type : 'item',
                        url  : 'new-participant-type'
                    },
                    {
                        id   : 'allParticipantTypes',
                        title: 'All Participant Types',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'participant-types'
                    }

                ]
            },
            {
                id       : 'users',
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
                    },
                    {
                        id   : 'addUserType',
                        title: 'Add User Type',
                        icon : 'face',
                        type : 'item',
                        url  : 'new-user-type'
                    },
                    {
                        id   : 'allUserTypes',
                        title: 'All User Types',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'user-types'
                    }
                ]
            },
            {
                id       : 'teams',
                title    : 'Teams',
                type     : 'collapsable',
                icon     : 'group_work',
                children : [
                    {
                        id   : 'addTeam',
                        title: 'Add Team',
                        icon : 'add',
                        type : 'item',
                        url  : 'new-team'
                    },
                    {
                        id   : 'allTeams',
                        title: 'All Teams',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'team'
                    }
                ]
            },
            {
                id       : 'salaries',
                title    : 'Salaries',
                type     : 'collapsable',
                icon     : 'account_balance_wallet',
                children : [
                    {
                        id   : 'addSalary',
                        title: 'Add Salary',
                        icon : 'add',
                        type : 'item',
                        url  : 'new-salary'
                    },
                    {
                        id   : 'allSalaries',
                        title: 'All Salaries',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'salaries'
                    }
                ]
            },
            {
                id       : 'businessClients',
                title    : 'Business Clients',
                type     : 'collapsable',
                icon     : 'business_center',
                children : [
                    {
                        id   : 'addClient',
                        title: 'Add Business Client',
                        icon : 'add',
                        type : 'item',
                        url  : 'new-client'
                    },
                    {
                        id   : 'allClients',
                        title: 'All Business Clients',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'business-clients'
                    }
                ]
            },
            {
                id       : 'bonuses',
                title    : 'Bonuses',
                type     : 'collapsable',
                icon     : 'attach_money',
                children : [
                    {
                        id   : 'addBonus',
                        title: 'Add Bonus',
                        icon : 'add',
                        type : 'item',
                        url  : 'new-bonus'
                    },
                    {
                        id   : 'allBonuses',
                        title: 'All Bonuses',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'bonuses'
                    }
                ]
            },
            {
                id       : 'daysOff',
                title    : 'Days Off',
                type     : 'collapsable',
                icon     : 'today',
                children : [
                    {
                        id   : 'addDaysOff',
                        title: 'Add Days Off',
                        icon : 'add',
                        type : 'item',
                        url  : 'new-days-off'
                    },
                    {
                        id   : 'allDaysOff',
                        title: 'All Days Off',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'days-off'
                    }
                ]
            },
            {
                id       : 'positions',
                title    : 'Positions',
                type     : 'collapsable',
                icon     : 'assessment',
                children : [
                    {
                        id   : 'addPosition',
                        title: 'Add Position',
                        icon : 'add',
                        type : 'item',
                        url  : 'new-position'
                    },
                    {
                        id   : 'allPositions',
                        title: 'All Positions',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'positions'
                    }
                ]
            }
        ]
    }
];
