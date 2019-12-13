ngapp.service('patchBuilder', function(progressLogger, progressService, pluginDiffCacheService, recordsToPatchService, changeMergeService) {
    let {findRecordsToPatch} = recordsToPatchService,
        {log, progress} = progressLogger;

    // PRIVATE
    let loadPatch = function(patch) {
        patch.plugin = xelib.GetElement(0, patch.filename);
        if (patch.plugin) return true;
        patch.plugin = xelib.AddFile(patch.filename, true);
    };

    let applyChanges = function(patch, changes) {
        // TODO: iterate through changes
        // TODO: copy records to patch
        // TODO: apply the changes to the patch records
    };

    // PUBLIC API
    this.buildPatch = function(patch) {
        pluginDiffCacheService.updateCache();
        let records = loadPatch(patch) && findRecordsToPatch(patch),
            excludeFn = records && (fid => records.includes(fid)),
            changes = changeMergeService.mergeChanges(patch, excludeFn);
        applyChanges(patch, changes);
    };

    this.showProgress = () => progressService.showProgress({
        determinate: true,
        title: 'Building Smashed Patch',
        message: 'Initializing...',
        logName: 'smash',
        current: 0,
        max: 1
    });
});