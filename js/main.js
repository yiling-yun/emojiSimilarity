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
const DIMENSIONS = [
    "Visual complexity refers to the emoji’s visual features, not to the features of the concept to which it refers. The more visual features the emoji contains, the more visually complex it can be considered to be.",
    "Familiarity refers to how often the participant encounters or sees the emoji in his/her daily life. Emojis encountered more frequently are, therefore, more familiar.",
    "Frequency of use refers to how often the participant uses the emoji.",
    "Emotional valence refers to the extent to which the emoji denotes something negative/unpleasant or something positive/pleasant.",
    "Emotional arousal refers to the extent to which the emoji denotes something passive/calm or something arousing/exciting.",
    "In your opinion, considering the visual characteristics of the symbol, and not the object or concept it may depict, how visually appealing is the stimulus?",
];
const LOWER_SCALE = [
    "very simple",
    "very unfamiliar",
    "I never use the emoji",
    "Completely Sad",
    "Completely calm",
    "Visually unpleasant",
];
const UPPER_SCALE = [
    "very complex",
    "very familiar",
    "I use the emoji very often",
    "Completely happy",
    "Completely aroused",
    "Visually very pleasant",
];
const PRAC_TRIAL_INPUT = {
    "0": 1,
    "1": 4,
    "2": 32,
    "3": 35
};
const NUM_DIMENSIONS = DIMENSIONS.length;
const EMOJIS_PER_PAGE = 3;
const TEST_STIM_PATH = STIM_PATH + 'test/';
//xxx: uncommented the following section for testing purposes
let TRIAL_INPUT = {
    "0": 1,
    "1": 4,
    "2": 32,
    "3": 35,
    "4": 68,
    "5": 70,
    "6": 108,
    // "7": 128,
};

// sort emoji orders
for (let i = 0; i < Object.keys(TRIAL_INPUT).length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    let temp = TRIAL_INPUT[i];
    TRIAL_INPUT[i] = TRIAL_INPUT[j]
    TRIAL_INPUT[j] = temp;
}

const EMOJI_DEFINITIONS = {
    "1": "General pleasure and good cheer or humor",
    "4": "Radiant, gratified happiness",
    "32": "Questioning or scorning something or someone",
    "35": "Mildly irritated or concerned",
    "68": "Feeling unsure",
    "70": "Mildly concerned, disappointed, or sad",
    "108": "Grinning cat",
    "128": "Love is in the air"
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
    // 0: SHOW_INSTR,
    // 1: SHOW_INSTR,
    // 2: SHOW_INSTR,
    // 3: SHOW_MAXIMIZE_WINDOW,
    // 4: SHOW_NO_MUSIC,
    // 5: SHOW_ONE_EMOJI,
    // 6: SHOW_THREE_EMOJIS,
    // 7: SHOW_INSTR,
    // 8: SHOW_INSTR,
    // 9: HIDE_EMOJIS,
    // 10: SHOW_DIFF_EMOJIS,
    // 11: HIDE_EMOJIS,
    // 12: SHOW_TASK,
    // 13: SHOW_INSTR,
    // 14: SHOW_INSTR,
    // 15: SHOW_INSTR_QUIZ,
    // 16: SHOW_CONSENT
    0: SHOW_INSTR,
    // 1: SHOW_MAXIMIZE_WINDOW,
    1: SHOW_ONE_EMOJI,
    2: HIDE_EMOJIS,
    3: SHOW_TASK,
    4: SHOW_INSTR,
    5: SHOW_INSTR,
    6: SHOW_INSTR_QUIZ,
    7: SHOW_CONSENT
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
    $('#allDimensionsContainer').show();
    $('#clarityContainer').hide();
    activeTrial.randomizedExptIDList = shuffle_array(Object.keys(activeTrial.trialInput));
    INIT_TRIAL();
    $('#taskBox').show();
    CLEAR_RADIO_BUTTONS();
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
        let emojiIndex = EMOJIS_PER_PAGE * bufferExptID;
        LOAD_BUFFERS(emojiIndex);
        $("#trialNextBut").hide();
    }

    //load trial
    UPDATE_INTERFACE();
    activeTrial.startTime = Date.now();
}

function LOAD_BUFFERS(emojiIndex) {
    if (emojiIndex < activeTrial.numEmojis) {
        firstEmojiBuffer = activeTrial.trialInput[emojiIndex];
        $('#firstEmojiBuffer').attr('src', activeTrial.stimPath + firstEmojiBuffer +'.png');
    }

    if (1 + emojiIndex < activeTrial.numEmojis) {
        secondEmojiBuffer = activeTrial.trialInput[1 + emojiIndex];
        $('#secondEmojiBuffer').attr('src', activeTrial.stimPath + secondEmojiBuffer +'.png');
    }

    if (2 + emojiIndex < activeTrial.numEmojis) {
        thirdEmojiBuffer = activeTrial.trialInput[2 + emojiIndex];
        $('#thirdEmojiBuffer').attr('src', activeTrial.stimPath + thirdEmojiBuffer +'.png');
    }
}

function LOAD_EMOJIS (emojiIndex) {
    if (emojiIndex < activeTrial.numEmojis) {
        firstEmoji = activeTrial.trialInput[emojiIndex];
        $('#firstEmoji').attr('src', activeTrial.stimPath + firstEmoji +'.png');
        $('.firstEmoji').show();
    }
    else {
        $('.firstEmoji').hide();
    }

    if (1 + emojiIndex < activeTrial.numEmojis) {
        secondEmoji = activeTrial.trialInput[1 + emojiIndex];
        $('#secondEmoji').attr('src', activeTrial.stimPath + secondEmoji +'.png');
        $('.secondEmoji').show();
    }
    else {
        $('.secondEmoji').hide();
    }

    if (2 + emojiIndex < activeTrial.numEmojis) {
        thirdEmoji = activeTrial.trialInput[2 + emojiIndex];
        $('#thirdEmoji').attr('src', activeTrial.stimPath + thirdEmoji +'.png');
        $('.thirdEmoji').show();
    }
    else {
        $('.thirdEmoji').hide();
    }
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
    //enable to proceed to the next trial
    $("#trialNextBut").show(); //xxx: (Pro: no easy get through the trials) alt: press SPACE BAR (Pro: no visual bias)
}

var radioButtons = $("input[type='radio']");
radioButtons.click(() => {
    const rating1Checked = $('input[name="rating1"]').is(":checked");
    const rating2Checked = $('input[name="rating2"]').is(":checked");
    const rating3Checked = $('input[name="rating3"]').is(":checked");
    if (
        (rating1Checked || $('.firstEmoji').is(":hidden")) &&
        (rating2Checked || $('.secondEmoji').is(":hidden")) &&
        (rating3Checked || $('.thirdEmoji').is(":hidden"))
    ) {
        SELECT(this);
    }

    const ratingClarityChecked = $('input[name="rating5"]').is(":checked");
    if (ratingClarityChecked) {
        SELECT(this);
    }
});

function CLEAR_RADIO_BUTTONS() {
    $('input[name="rating1"]').prop("checked", false);
    $('input[name="rating2"]').prop("checked", false);
    $('input[name="rating3"]').prop("checked", false);
    $('input[name="rating5"]').prop("checked", false);
}

function NEXT_TRIAL() {
    activeTrial.dimensionIndex = activeTrial.dimensionIndex + 1;
    activeTrial.exptId = activeTrial.trialIndex;
    let emojiIndex = EMOJIS_PER_PAGE * activeTrial.exptId + activeTrial.dimensionIndex - NUM_DIMENSIONS;

    // go to next set of emojis
    if (activeTrial.dimensionIndex - NUM_DIMENSIONS >= EMOJIS_PER_PAGE || emojiIndex >= activeTrial.numEmojis) {
        //save current trial data
        var dataList = list_from_attribute_names(activeTrial, activeTrial.titles);
        activeTrial.allData += list_to_formatted_string(dataList, ";");

        //update trialIndex
        activeTrial.trialIndex = activeTrial.trialIndex + 1;

        //update interface if there are more trials
        if (activeTrial.trialIndex < activeTrial.trialN) {
            $("#stimuliBox").hide();
            $("#trialNextBut").hide();
            
            CLEAR_RADIO_BUTTONS();
            setTimeout(INIT_TRIAL, activeTrial.intertrialInterval);
        }
        //end
        else {
            $("#trialNextBut").hide();
            $("#taskBox").hide();
            // this is to check that the data is correct when saved
            // console.log(activeTrial.allData);
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
    else {
        // update interface for next dimension
        $("#trialNextBut").hide();
        $("#stimuliBox").hide();
        CLEAR_RADIO_BUTTONS();
        setTimeout(INIT_TRIAL, activeTrial.intertrialInterval);
    }
}

function UPDATE_INTERFACE() {
    //update stimuli
    activeTrial.exptId = activeTrial.trialIndex;
    let emojiIndex = EMOJIS_PER_PAGE * activeTrial.exptId;
    let clarityEmojiIndex = EMOJIS_PER_PAGE * activeTrial.exptId + activeTrial.dimensionIndex - NUM_DIMENSIONS;
    LOAD_EMOJIS(emojiIndex);

    // go to next set of emojis after clarity dimension
    if (activeTrial.dimensionIndex - NUM_DIMENSIONS >= EMOJIS_PER_PAGE || clarityEmojiIndex >= activeTrial.numEmojis) {
        $('#allDimensionsContainer').show();
        $('#clarityContainer').hide();    
        activeTrial.dimensionIndex = 0;
    }

    $("#dimensionQuestion").text(DIMENSIONS[activeTrial.dimensionIndex]);
    $(".lowerScale").text(LOWER_SCALE[activeTrial.dimensionIndex]);
    $(".upperScale").text(UPPER_SCALE[activeTrial.dimensionIndex]);
    
    // set up clarity page
    if (activeTrial.dimensionIndex >= NUM_DIMENSIONS) {
        $('#allDimensionsContainer').hide();
        $('#clarityContainer').show();
        $("#dimensionQuestion").text("Clarity refers to the relationship between the emoji and its meaning.");
        clarityEmoji = activeTrial.trialInput[clarityEmojiIndex];
        $('#clarityEmoji').attr('src', activeTrial.stimPath + clarityEmoji +'.png');
        $('#emojiDefinition').text("Meaning: " + EMOJI_DEFINITIONS[activeTrial.trialInput[clarityEmojiIndex]]);
    }
    else {
        // go to next dimension

        // show emotional dimension images if dimension is emotional valence or emotional arousal
        if (DIMENSIONS[activeTrial.dimensionIndex].split(" ")[1] == "valence") {
            $(".emotionDimension").show();
            $("input[type='radio']").css('margin', '20px');
            $("input[value='1']").css('margin-left', '48px');

            $("#scaleNumbersContainer").hide();
            $('#emotionImage').attr('src', 'emotionalValence.png');
        }
        else if (DIMENSIONS[activeTrial.dimensionIndex].split(" ")[1] == "arousal") {
            $(".emotionDimension").show();
            $("input[type='radio']").css('margin', '20px');
            $("input[value='1']").css('margin-left', '48px');

            $("#scaleNumbersContainer").hide();
            $('#emotionImage').attr('src', 'emotionalArousal.png');
        }
        else {
            $(".emotionDimension").hide();
            $("#scaleNumbersContainer").show();
            $("input[type='radio']").css('margin', 'auto');        
        }
    }

    //buffer next trial
    if (activeTrial.trialIndex + 1 < activeTrial.trialN){
        let bufferExptID = activeTrial.trialIndex + 1;
        let bufferEmojiIndex = 4 * bufferExptID;
        LOAD_BUFFERS(bufferEmojiIndex);
    }

    //update interface structure
    $("#stimuliBox img").css("border", "#f9f9f9");
    $("#stimuliBox").show();
};

// list of variables to be save, the variable names
// trialobject uses these strings to get the variables in the code
const TRIAL_TITLES = [
    // TODO: save the question being asked  trial.rating = rating
    // add 
    "subjNum",
    "subjStartDate",
    "subjStartTime",
    "trialType",
    "trialIndex", // refers to the index of the trial that they are seeing from 0 to n-1
    "exptId", // the trial that is corresponding to the input dataset, is randomized for each participant
    "leftEmoji", // change these to the data you want
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
