const FORMAL = false;
const EXPERIMENT_NAME = "emoji";
const VISIT_FILE = 'visit_' + EXPERIMENT_NAME + '.txt';
const SUBJ_NUM_FILE = 'subjNum_' + EXPERIMENT_NAME + '.txt';
const TRIAL_FILE = "trial_" + EXPERIMENT_NAME + ".txt";
const ATTRITION_FILE = 'attrition_' + EXPERIMENT_NAME + '.txt';
const SUBJ_FILE = 'subj_' + EXPERIMENT_NAME + '.txt';
const SAVING_DIR_HOME = '/var/www-data-experiments/cvlstudy_data/YY/'+EXPERIMENT_NAME;
const SAVING_DIR = FORMAL ? SAVING_DIR_HOME+'/formal' : SAVING_DIR_HOME+'/testing';
const COMPLETION_URL = "https://ucla.sona-systems.com/webstudy_credit.aspx?experiment_id=2338&credit_token=f36782a1039345a7af15837ca9592180&survey_code=";
const SUBJ_NUM_SCRIPT = 'php/subjNum.php';
const SAVING_SCRIPT = 'php/save.php';
const ID_GET_VARIABLE_NAME = 'id';

//stimuli
const EXPT_N = 46;
const STIM_PATH = 'stim/';
const INSTR_IMG_LIST = ['blank.png','maximize_window.png','no_music.png','ucla.png'];
const INTERTRIAL_INTERVAL = 500; //ms
const ONE_EMOJI_EXAMPLE = "3.png";
const THREE_EMOJI_EXAMPLE = ["71.png", "3.png", "888.png"];
const DIFF_EMOJIS = ["514.png", "659.png", "1021.png", "866.png", "918.png", "134.png", "1552.png"];
const PRAC_STIM_PATH = STIM_PATH + 'test/';
const PRAC_TRIAL_INPUT = {
    "0": [1, 4, 895],
    "1": [1391, 1395, 1024],
    "2": [548, 541, 516]
};
const TEST_STIM_PATH = STIM_PATH + 'test/';
//xxx: uncommented the following section for testing purposes
const TRIAL_INPUT = {
    "0": ["545", "289", "1298"],
    "1": ["992", "331", "855"],
    "2": ["1020", "159", "720"],
    "3": ["331", "1223", "545"],
    "4": ["720", "1206", "245"],
    "5": ["1141", "1140", "68"]
};
//xxx: ignore the following commented part
// // const exptVerToManuallyAssign = [6, 19, 20, 23, 24, 39, 43, 21, 27, 36, 37, 38, 18];
// // const subjNumBefore = 51;
// // const exptVerToManuallyAssign = [23, 24, 18];
// // const subjNumBefore = 63;
// const exptVerToManuallyAssign = [35, 41, 12, 19, 37, 3];
// const subjNumBefore = 114;

// criteria
const VIEWPORT_MIN_W = 800;
const VIEWPORT_MIN_H = 600;

let subj, instr, practice, test, activeTrial;

//  ######  #######    #    ######  #     #
//  #     # #         # #   #     #  #   #
//  #     # #        #   #  #     #   # #
//  ######  #####   #     # #     #    #
//  #   #   #       ####### #     #    #
//  #    #  #       #     # #     #    #
//  #     # ####### #     # ######     #


$(document).ready(function() {
    subj = new Subject(subj_options);
    //xxx: commented to show on local
    // subj.id = subj.getID(ID_GET_VARIABLE_NAME);
    subj.saveVisit();
    // if (subj.phone) {
    //     halt_experiment('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at yiling.yun@g.ucla.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
    // } else if (subj.validID){
        let ALL_IMG_LIST = INSTR_IMG_LIST.concat(THREE_EMOJI_EXAMPLE, DIFF_EMOJIS);
        load_img(0, STIM_PATH, ALL_IMG_LIST);
        instr = new instrObject(instr_options);
        instr.start();
    // }
});

function halt_experiment(explanation) {
    $('.pageBox').hide();
    $('#instrText').html(explanation);
    $('#instrNextBut').hide();
    $('#instrBox').show();
}

//   #####  #     # ######        # #######  #####  #######
//  #     # #     # #     #       # #       #     #    #
//  #       #     # #     #       # #       #          #
//   #####  #     # ######        # #####   #          #
//        # #     # #     # #     # #       #          #
//  #     # #     # #     # #     # #       #     #    #
//   #####   #####  ######   #####  #######  #####     #

const SUBJ_TITLES = [
    'num',
    'date',
    'startTime',
    'id',
    'userAgent',
    'endTime',
    'duration',
    'quizAttemptN',
    'instrReadingTimes',
    'hiddenCount',
    'hiddenDurations',
    'comments',
    'serious',
    'problems',
    'gender',
    'age',
    'inView',
    'viewportW',
    'viewportH'
];

function update_task_object_subj_num() {
    if (typeof test !== 'undefined'){
        test.num = subj.num;
    }
}

function submit_debriefing_questions() {
    const OPEN_ENDED_ATTRIBUTE_NAMES = ['comments', 'problems', 'age'];
    const CHOICE_ATTRIBUTE_NAMES = ['serious', 'gender'];
    const ALL_RESPONDED = show_hide_warnings(OPEN_ENDED_ATTRIBUTE_NAMES, CHOICE_ATTRIBUTE_NAMES);
    if (ALL_RESPONDED) {
        for (let a of OPEN_ENDED_ATTRIBUTE_NAMES) {
            subj[a] = subj[a].replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        subj.quizAttemptN = instr.quizAttemptN;
        subj.instrReadingTimes = JSON.stringify(instr.readingTimes);
        subj.submitAnswers();
        $('#questionsBox').hide();
        exit_fullscreen();
        allow_selection();
        $('#debriefingBox').show();
        $('body').scrollTop(0);
    }
}

function show_hide_warnings(open_ended_names, choice_names) {
    let all_responded = true;
    for (let q of open_ended_names) {
        subj[q] = $('#'+q).val();
        if(!check_if_responded([subj[q]], [])){
            $('#'+q+'-warning').show();
            all_responded = false;
            $('body').scrollTop(0);
        }else{
            $('#'+q+'-warning').hide();
        }
    }
    for (let q of choice_names) {
        subj[q] = $('input[name='+q+']:checked').val();
        if(!check_if_responded([], [subj[q]])){
            $('#'+q+'-warning').show();
            all_responded = false;
            $('body').scrollTop(0);
        }else{
            $('#'+q+'-warning').hide();
        }
    }
    return all_responded;
}

function allow_selection() {
    $('body').css({
        '-webkit-user-select':'text',
        '-moz-user-select':'text',
        '-ms-user-select':'text',
        'user-select':'text'
    });
}

function go_to_completion_page() {
    window.location.href = COMPLETION_URL+subj.id;
}

let subj_options = {
    titles: SUBJ_TITLES,
    viewportMinW: VIEWPORT_MIN_W,
    viewportMinH: VIEWPORT_MIN_H,
    subjNumCallback: update_task_object_subj_num,
    subjNumScript: SUBJ_NUM_SCRIPT,
    savingScript: SAVING_SCRIPT,
    subjNumFile: SUBJ_NUM_FILE,
    visitFile: VISIT_FILE,
    attritionFile: ATTRITION_FILE,
    subjFile: SUBJ_FILE,
    savingDir: SAVING_DIR
};

//  ### #     #  #####  ####### ######  #     #  #####  ####### ### ####### #     #
//   #  ##    # #     #    #    #     # #     # #     #    #     #  #     # ##    #
//   #  # #   # #          #    #     # #     # #          #     #  #     # # #   #
//   #  #  #  #  #####     #    ######  #     # #          #     #  #     # #  #  #
//   #  #   # #       #    #    #   #   #     # #          #     #  #     # #   # #
//   #  #    ## #     #    #    #    #  #     # #     #    #     #  #     # #    ##
//  ### #     #  #####     #    #     #  #####   #####     #    ### ####### #     #

var instr_text = new Array;
instr_text[0] = "<strong>Welcome!</strong><br /><br />We are cognitive scientists researching how we interpret symbols or tokens that we encounter in daily life, such as emojis.";
instr_text[1] = "Your contributions may help in building computer vision systems and designing robots!<br /><br />And, most importantly, we hope this is fun for you, too!";
instr_text[2] = "This experiment will take about 25 minutes to complete.<br /><br />Please help us by reading the instructions in the next few pages carefully, and avoid using the refresh or back buttons.";
instr_text[3] = "For this study to work, the webpage will automatically switch to the fullscreen view on the next page. Please stay in the fullscreen mode until the study automatically switches out from it.";
instr_text[4] = "Please also turn off any music you are playing. Music is known to affect our kind of studies and will make your data unusable.";
instr_text[5] = "In this experiment, we will show you some emojis, just like the one below.";
instr_text[6] = "Each time, three emojis will show up. ";
instr_text[7] = "Your job is to judge which emoji is the odd one out. That is to say, you should select the emoji that is the most different from the other two.";
instr_text[8] = "You will make the selection by clicking on that emoji.";
instr_text[9] = "Then you can continue to the next trial.";
instr_text[10] = "You will see different emojis, not just faces.";
instr_text[11] = "Let's try a few times on the next page!";
instr_text[12] = "";
instr_text[13] = "We hope that was clear!<br /><br />By the way, you don't need to spend too much time thinking about what to choose. Just follow your intuition.";
instr_text[14] = "The next page is a quick instruction quiz. (It's very simple!)";
instr_text[15] = "";
instr_text[16] = "Great! You can press SPACE to start. Please focus after you start. (Don't switch to other windows or tabs!).<br><br>Please try your best, but please also know that this task is supposed to be hard; so don't worry if you find it difficult!";

const INSTR_FUNC_DICT = {
    0: SHOW_INSTR,
    1: SHOW_INSTR,
    2: SHOW_INSTR,
    3: SHOW_MAXIMIZE_WINDOW,
    4: SHOW_NO_MUSIC,
    5: SHOW_ONE_EMOJI,
    6: SHOW_THREE_EMOJIS,
    7: SHOW_INSTR,
    8: SHOW_INSTR,
    9: HIDE_EMOJIS,
    10: SHOW_DIFF_EMOJIS,
    11: HIDE_EMOJIS,
    12: SHOW_TASK,
    13: SHOW_INSTR,
    14: SHOW_INSTR,
    15: SHOW_INSTR_QUIZ,
    16: SHOW_CONSENT
};


function SHOW_INSTR(){
    $('#instrImg').css('display', 'none');
    $('#instrText').show();
    $('#instrNextBut').show();
};

function SHOW_INSTR_IMG(file_name) {
    $('#instrImg').attr('src', 'stim/' + file_name);
    $('#instrImg').css('display', 'block');
}

function SHOW_MAXIMIZE_WINDOW() {
    SHOW_INSTR_IMG('maximize_window.png');
}

function SHOW_NO_MUSIC() {
    if (subj.num == 'pre-post') {
        subj.obtainSubjNum();
    }
    prac_trial_options['subj'] = subj;
    trial_options['subj'] = subj;
    enter_fullscreen();
    SHOW_INSTR_IMG('no_music.png');
}

function SHOW_ONE_EMOJI() {
    $('#instrImg').css('display', 'none');
    $("#instrStimBox").css("display", "flex");
    $("#instrStimBox").empty();
    $("#instrStimBox").append("<img src='stim/" + ONE_EMOJI_EXAMPLE + "'/>");
}

function SHOW_THREE_EMOJIS() {
    $("#instrStimBox").empty();
    for(let i = 0; i < THREE_EMOJI_EXAMPLE.length; i++){
        $("#instrStimBox").append("<img src='stim/" + THREE_EMOJI_EXAMPLE[i] + "'/>");
    }
}

function SHOW_DIFF_EMOJIS() {
    $("#instrStimBox").css("display", "flex");
    $("#instrStimBox").empty();
    for(let i = 0; i < DIFF_EMOJIS.length; i++){
        $("#instrStimBox").append("<img src='stim/" + DIFF_EMOJIS[i] + "'/>");
    }
    $("#instrStimBox img").css("margin", "100px 0px");
}

function HIDE_EMOJIS() {
    $("#instrStimBox").css("display", "none");
    practice = new trialObject(prac_trial_options);
    activeTrial = practice;
}

function SHOW_TASK() {
    subj.detectVisibilityStart();
    $('#instrBox').hide();
    activeTrial.randomizedExptIDList = shuffle_array(Object.keys(activeTrial.trialInput));
    INIT_TRIAL();
    $('#taskBox').show();
}

function SHOW_INSTR_QUIZ() {
    $('#instrBox').hide();
    $('#quizBox').show();
    test = new trialObject(trial_options);
    //xxx: uncommented the following two lines to test in local
    activeTrial.trialInput = TRIAL_INPUT;
    activeTrial.trialN = Object.keys(activeTrial.trialInput).length;
    //xxx: commented the following line to test in local
    // import_json(test, subj.num);
    activeTrial = test;
}

// function import_json(activeTrial, num){
//     let exptVer = num % EXPT_N;

//     if (exptVer == 0)
//         exptVer = EXPT_N;

//     // let exptVer = exptVerToManuallyAssign[(num - 1 - subjNumBefore) % exptVerToManuallyAssign.length];

//     fetch("./input_v2/expt" + String(exptVer) + ".json")
//         .then(response => {
//             return response.json();
//             })
//             .then(data => {
//                 activeTrial.trialInput = data;
//                 activeTrial.trialN = Object.keys(activeTrial.trialInput).length;
//             });
// }

function SUBMIT_INSTR_QUIZ() {
    const CHOICE = $('input[name="quiz"]:checked').val();
    if (typeof CHOICE === 'undefined') {
        $('#quizWarning').text('Please answer the question. Thank you!');
    } else if (CHOICE != 'different') {
        instr.qAttemptN += 1;
        $('#quizBox').hide();
        $('#instrText').text('You have given an incorrect answer. Please read the instructions again carefully.');
        $('#instrBox').show();
        instr.index = -1;
        $('input[name="quiz"]:checked').prop('checked', false);
    } else {
        instr.next();
        $('#quizBox').hide();
        $('#instrBox').show();
    }
}

function SHOW_CONSENT() {
    $('#instrNextBut').hide();
    $('#consentBox').show();
    $(document).keyup(function(e) {
        if (e.key == ' ') {
            instr.saveReadingTime();
            $(document).off('keyup');
            subj.saveAttrition();
            SHOW_TASK();
        }
    });
}

var instr_options = {
    text: instr_text,
    funcDict: INSTR_FUNC_DICT,
};

//  ####### ######  ###    #    #
//     #    #     #  #    # #   #
//     #    #     #  #   #   #  #
//     #    ######   #  #     # #
//     #    #   #    #  ####### #
//     #    #    #   #  #     # #
//     #    #     # ### #     # #######

function INIT_TRIAL(){
    //show progress
    let progress = Math.round(activeTrial.trialIndex/activeTrial.trialN * 100);
    $("#progress").html(progress+ "% completed");

    //buffer first trial
    if (activeTrial.trialIndex == 0) {
        let bufferExptID = activeTrial.randomizedExptIDList[activeTrial.trialIndex];
        leftEmojiBuffer = activeTrial.trialInput[bufferExptID][0];
        middleEmojiBuffer = activeTrial.trialInput[bufferExptID][1];
        rightEmojiBuffer = activeTrial.trialInput[bufferExptID][2];
        $('#leftEmojiBuffer').attr('src', activeTrial.stimPath + leftEmojiBuffer +'.png');
        $('#middleEmojiBuffer').attr('src', activeTrial.stimPath + middleEmojiBuffer +'.png');
        $('#rightEmojiBuffer').attr('src', activeTrial.stimPath + rightEmojiBuffer +'.png');
    }

    //load trial
    UPDATE_INTERFACE();
    activeTrial.startTime = Date.now();
}

function SELECT(ele) {
    //record response time
    var decideTime = Date.now();
    activeTrial.rt = decideTime - activeTrial.startTime;

    //record response
    var choicePos = $(ele).attr('id');
    var choice = "";
    choice = activeTrial[choicePos];
    activeTrial.choicePos = choicePos;
    activeTrial.choice = choice;

    //show border to indicate selection
    $("#stimuliBox img").css("border", "#f9f9f9"); //prevent selecting multiple
    $(ele).css("border", "solid black");

    //enable to proceed to the next trial
    $("#trialNextBut").show(); //xxx: (Pro: no easy get through the trials) alt: press SPACE BAR (Pro: no visual bias)
}

function NEXT_TRIAL() {
    //save current trial data
    var dataList = list_from_attribute_names(activeTrial, activeTrial.titles);
    activeTrial.allData += list_to_formatted_string(dataList, ";");

    //update trialIndex
    activeTrial.trialIndex = activeTrial.trialIndex + 1;

    //update interface if there is more trials
    if (activeTrial.trialIndex < activeTrial.trialN) {
        $("#stimuliBox").hide();
        $("#trialNextBut").hide();
        setTimeout(INIT_TRIAL, activeTrial.intertrialInterval);
    }
    //end
    else {
        $("#trialNextBut").hide();
        $("#taskBox").hide();
        activeTrial.save();
        subj.detectVisibilityEnd();
        if (activeTrial.trialType == "practice") {
            $("#instrBox").show();
            instr.next();
        } else {
            $("#questionsBox").show();
        }
    }
}

function UPDATE_INTERFACE() {
    //update stimuli
    activeTrial.exptId = activeTrial.randomizedExptIDList[activeTrial.trialIndex];
    activeTrial.leftEmoji = activeTrial.trialInput[activeTrial.exptId][0];
    activeTrial.middleEmoji = activeTrial.trialInput[activeTrial.exptId][1];
    activeTrial.rightEmoji = activeTrial.trialInput[activeTrial.exptId][2];
    $('#leftEmoji').attr('src', activeTrial.stimPath + activeTrial.leftEmoji +'.png');
    $('#middleEmoji').attr('src', activeTrial.stimPath + activeTrial.middleEmoji +'.png');
    $('#rightEmoji').attr('src', activeTrial.stimPath + activeTrial.rightEmoji +'.png');

    //buffer next trial
    if (activeTrial.trialIndex + 1 < activeTrial.trialN){
        let bufferExptID = activeTrial.randomizedExptIDList[activeTrial.trialIndex + 1];
        leftEmojiBuffer = activeTrial.trialInput[bufferExptID][0];
        middleEmojiBuffer = activeTrial.trialInput[bufferExptID][1];
        rightEmojiBuffer = activeTrial.trialInput[bufferExptID][2];
        $('#leftEmojiBuffer').attr('src', activeTrial.stimPath + leftEmojiBuffer +'.png');
        $('#middleEmojiBuffer').attr('src', activeTrial.stimPath + middleEmojiBuffer +'.png');
        $('#rightEmojiBuffer').attr('src', activeTrial.stimPath + rightEmojiBuffer +'.png');
    }

    //update interface structure
    $("#stimuliBox img").css("border", "#f9f9f9");
    $("#stimuliBox").show();
};

const TRIAL_TITLES = [
    "subjNum",
    "subjStartDate",
    "subjStartTime",
    "trialType",
    "trialIndex",
    "exptId",
    "leftEmoji",
    "middleEmoji",
    "rightEmoji",
    "choice",
    "choicePos",
    "rt"
];

var trial_options = {
    subj: 'pre-define',
    trialType: "test",
    titles: TRIAL_TITLES,
    dataFile: TRIAL_FILE,
    stimPath: TEST_STIM_PATH,
    savingScript: SAVING_SCRIPT,
    savingDir: SAVING_DIR,
    intertrialInterval: INTERTRIAL_INTERVAL,
    trialInput: TRIAL_INPUT,
}

var prac_trial_options = {
    subj: 'pre-define',
    trialType: "practice",
    titles: TRIAL_TITLES,
    dataFile: TRIAL_FILE,
    stimPath: PRAC_STIM_PATH,
    savingScript: SAVING_SCRIPT,
    savingDir: SAVING_DIR,
    intertrialInterval: INTERTRIAL_INTERVAL,
    trialInput: PRAC_TRIAL_INPUT,
}
