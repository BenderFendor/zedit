ngapp.service('settingsService', function($rootScope) {
    let service = this,
        tabs = [{
            label: 'Core',
            templateUrl: 'partials/settings/core.html',
            controller: 'coreSettingsController',
            defaultGlobalSettings: { theme: 'day.css', syntaxTheme: '' }
        }];

    // private functions
    let buildSettings = function(settings, global = false) {
        let defaults = {},
            defaultsPath = global ? 'defaultGlobalSettings' : 'defaultSettings';
        tabs.forEach(tab => {
            if (!tab[defaultsPath]) return;
            Object.deepAssign(defaults, tab[defaultsPath])
        });
        return Object.deepAssign(defaults, settings);
    };

    // public functions
    this.loadProfileSettings = function(profileName) {
        service.currentProfile = profileName;
        service.settingsPath = `profiles/${profileName}/settings.json`;
        let settings = fh.loadJsonFile(service.settingsPath) || {};
        service.settings = buildSettings(settings);
        service.saveProfileSettings();
    };

    this.loadGlobalSettings = function() {
        service.globalSettingsPath = `${fh.userPath}\\settings.json`;
        let settings = fh.loadJsonFile(service.globalSettingsPath) || {};
        service.globalSettings = buildSettings(settings, true);
        service.saveGlobalSettings();
    };

    this.saveProfileSettings = function() {
        fh.saveJsonFile(service.settingsPath, service.settings);
    };

    this.saveGlobalSettings = function() {
        fh.saveJsonFile(service.globalSettingsPath, service.globalSettings);
    };

    this.registerSettings = function(settingsTab) {
        tabs.push(settingsTab);
    };

    this.getTabs = function() {
        return tabs.filter(tab => {
            return !tab.appModes || tab.appModes.includes($rootScope.appMode);
        }).map(tab => ({
            label: tab.label,
            templateUrl: tab.templateUrl,
            controller: tab.controller,
            customActions: tab.customActions
        }));
    };
});
