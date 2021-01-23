import { LocaleMessageObject } from 'vue-i18n';

const msgs: LocaleMessageObject = {
    hangar: {
        projectSearch: {
            query: 'Search in {0} projects, proudly made by the community...',
            relevanceSort: 'Sort with relevance',
        },
        subtitle: 'A Minecraft package repository',
        sponsoredBy: 'Sponsored by',
    },
    nav: {
        login: 'Login',
        signup: 'Signup',
        user: {
            notifications: 'Notifications',
            flags: 'Flags',
            projectApprovals: 'Project approvals',
            versionApprovals: 'Version approvals',
            stats: 'Stats',
            health: 'Hangar Health',
            log: 'User Action Log',
            platformVersions: 'Platform Versions',
            logout: 'Sign out',
        },
        new: {
            project: 'New Project',
            organization: 'New Organization',
        },
        hangar: {
            home: 'Homepage',
            forums: 'Forums',
            code: 'Code',
            docs: 'Docs',
            javadocs: 'JavaDocs',
            hangar: 'Hangar (Plugins)',
            downloads: 'Downloads',
            community: 'Community',
        },
    },
    project: {
        category: {
            admin_tools: 'Admin Tools',
            chat: 'Chat',
            dev_tools: 'Developer Tools',
            economy: 'Economy',
            gameplay: 'Gameplay',
            games: 'Games',
            protection: 'Protection',
            role_playing: 'Role Playing',
            world_management: 'World Management',
            misc: 'Miscellaneous',
        },
    },
    message: 'Good morning!',
};

export default msgs;