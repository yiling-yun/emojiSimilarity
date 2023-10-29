class trialObject {
    constructor(options = {}) {
        Object.assign(this, {
            subj: false,
            trialType: "",
            titles: '',
            dataFile: '',
            stimPath: 'stim/',
            savingScript: '',
            savingDir: 'data/testing',
            trialInput: [],
            intertrialInterval: 0.5,
        }, options);
        this.trialIndex = 0;
        this.trialN = Object.keys(this.trialInput).length;
        this.allData = list_to_formatted_string(this.titles, ";");
        this.getSubjectData();
    }

    getSubjectData() {
        this.subjNum = this.subj.num;
        this.subjStartDate = this.subj.date;
        this.subjStartTime = this.subj.startTime;
    }

    save() {
        let postData = {
            'directory_path': this.savingDir,
            'file_name': this.dataFile,
            'data': this.allData
        };
        $.ajax({
            type: 'POST',
            url: this.savingScript,
            data: postData,
        });
    }
}



