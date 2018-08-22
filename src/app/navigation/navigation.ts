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
                    },
                    {
                        id   : 'addProjectExpense',
                        title: 'Add Project Expense',
                        icon: 'attach_money',
                        type : 'item',
                        url  : 'new-project-expense'
                    },
                    {
                        id   : 'allProjectExpenses',
                        title: 'All Project Expenses',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'project-expenses'
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
                        title: 'Days Off',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'days-off'
                    },
                    {
                        id   : 'daysOffRequests',
                        title: 'Days Off Requests',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'days-off-requests'
                    },
                    {
                        id   : 'daysOffUser',
                        title: 'Days Off Stats',
                        icon: 'timer_off',
                        type : 'item',
                        url  : 'days-off-per'
                    },
                    {
                        id   : 'newHoliday',
                        title: 'New Holiday',
                        icon: 'add_alarm',
                        type : 'item',
                        url  : 'new-holiday'
                    },
                    {
                        id   : 'holidays',
                        title: 'Holidays',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'holidays'
                    }
                ]
            },
            {
                id       : 'banks',
                title    : 'Banks',
                type     : 'collapsable',
                icon     : 'account_balance',
                children : [
                    {
                        id   : 'addBank',
                        title: 'Add Bank',
                        icon : 'add',
                        type : 'item',
                        url  : 'new-bank'
                    },
                    {
                        id   : 'allBanks',
                        title: 'All Banks',
                        icon: 'format_list_bulleted',
                        type : 'item',
                        url  : 'banks'
                    }
                ]
            },
            {
                id       : 'banks',
                title    : 'Bank Accounts',
                type     : 'collapsable',
                icon     : 'account_box',
                children : [
                    {
                        id   : 'addAccount',
                        title: 'New Bank Account',
                        icon : 'monetization_on',
                        type : 'item',
                        url  : 'new-account'
                    },
                    {
                        id   : 'allAccounts',
                        title: 'All Bank Accounts',
                        icon : 'format_list_bulleted',
                        type : 'item',
                        url  : 'accounts'
                    }
                ]
            }
        ]

    }
];
