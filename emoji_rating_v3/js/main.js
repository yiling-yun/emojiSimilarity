const FORMAL = false;
const EXPERIMENT_NAME = "emoji_rating_v3";
const VISIT_FILE = 'visit_' + EXPERIMENT_NAME + '.txt';
const SUBJ_NUM_FILE = 'subjNum_' + EXPERIMENT_NAME + '.txt';
const TRIAL_FILE = "trial_" + EXPERIMENT_NAME + ".txt";
const ATTRITION_FILE = 'attrition_' + EXPERIMENT_NAME + '.txt';
const SUBJ_FILE = 'subj_' + EXPERIMENT_NAME + '.txt';
const SAVING_DIR_HOME = '/var/www-data-experiments/cvlstudy_data/YY/'+EXPERIMENT_NAME;
const SAVING_DIR = FORMAL ? SAVING_DIR_HOME+'/formal_rating' : SAVING_DIR_HOME+'/testing_rating';
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

// list dimensions, scale labels, and the order of dimensions
const DIMENSIONS = [
    "Visual complexity refers to the emoji’s visual features, not to the features of the concept to which it refers. The more visual features the emoji contains, the more visually complex it can be considered to be.",
    "Familiarity refers to how often the participant encounters or sees the emoji in his/her daily life. Emojis encountered more frequently are, therefore, more familiar.",
    "Frequency of use refers to how often the participant uses the emoji.",
    "Emotional valence refers to the extent to which the emoji denotes something negative/unpleasant or something positive/pleasant.",
    "Emotional arousal refers to the extent to which the emoji denotes something passive/calm or something arousing/exciting.",
    "In your opinion, considering the visual characteristics of the symbol, and not the object or concept it may depict, how visually appealing is the stimulus?",
    "Clarity refers to the relationship between the emoji and its meaning.",
];
const LOWER_SCALES = [
    "very simple",
    "very unfamiliar",
    "I never use the emoji",
    "Completely Sad",
    "Completely calm",
    "Visually unpleasant",
    "The emoji does not represent the meaning at all",
];
const UPPER_SCALES = [
    "very complex",
    "very familiar",
    "I use the emoji very often",
    "Completely happy",
    "Completely aroused",
    "Visually very pleasant",
    "The emoji represents the meaning very well"
];
const ORDER_OF_DIMENSIONS = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6
}
// shuffle dimension order
for (let i = 0; i < Object.keys(ORDER_OF_DIMENSIONS).length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    let temp = ORDER_OF_DIMENSIONS[i];
    ORDER_OF_DIMENSIONS[i] = ORDER_OF_DIMENSIONS[j]
    ORDER_OF_DIMENSIONS[j] = temp;
}

const PRAC_TRIAL_INPUT = { "0": 68, "1": 108, "2": 245};
const NUM_DIMENSIONS = DIMENSIONS.length;
const EMOJIS_PER_PAGE = 3;
const TEST_STIM_PATH = STIM_PATH + 'test/';
const EMOJI_FILENAME = [8,15,134,17,7];
    // ,14,19,83,41,82,39,32,6,75,128,48,46,72,76,260,1,70,25,11,263,40,84,81,20,12,182,162,49,191,63,30,78,21,45,187,4,10,87,139,29,88,1001,90,165,127];
const CLARITY_DES = [["Face with tears of joy:", "Widely used to show something is funny or pleasing. "],
["Smiling face with heart-eyes:", "Often conveys enthusiastic feelings of love, infatuation, and adoration, e.g., I love/am in love with this person or thing."],
["Heart on fire:", "For extreme or passionate forms of love or lust. Most representative of desire or lust. This emoji may also indicate a sense of burning a past love and moving on."],
["Face blowing a kiss:", "May represent a kiss goodbye or good night and convey feelings of love and affection more generally. "],
["Rolling on the floor laughing:", "Often conveys hysterical laughter more intense than Face With Tears of Joy."],
// ["Smiling face with hearts:", "Expresses a range of happy, affectionate feelings, especially being in love."],
// ["Smiling face:", "Conveys a wide range of warm, positive feelings, including love, happiness, and gratitude."],
// ["Loudly crying face:", "May convey inconsolable grief but also other intense feelings, such as uncontrollable laughter, pride or overwhelming joy."],
// ["Face with rolling eyes:", "As with the gesture of an eye-roll, commonly conveys moderate disdain, disapproval, frustration, or boredom. Tone varies, including playful, sassy, resentful, and sarcastic,as if saying Yeah, whatever."],
// ["Crying face:", "May convey a moderate degree of sadness or pain, usually less intensely than Loudly Crying Face."],
// ["Smirking face:", "Often used to convey flirtation or sexual innuendo."],
// ["Thinking face:", "Intended to show a person pondering or deep in thought. Often used to question or scorn something or someone, as if saying Hmm, I don't know about that. Tone varies, including earnest, playful, puzzled, skeptical, and mocking."],
// ["Grinning face with sweat:", "Intended to depict nerves or discomfort but commonly used to express a close call, as if saying Whew! and wiping sweat from the forehead. "],
// ["Flushed face:", "Intended to depict such feelings as embarrassment, but meaning very widely varies. Other senses include flattery, surprise, disbelief, admiration, affection, and excitement."],
// ["Two hearts:", "Can be used to display that \"love is in the air\""],
// ["Drooling face:", "Often used to show desire for a person (sexy, attractive) or object (e.g., delicious food). May also represent someone is tired or sleeping."], 
// ["Pensive face:", "May convey a variety of sad emotions, including feeling disappointed, hurt, or lonely. Less intense than other sad emojis like Loudly Crying Face and more introspective."], 
// ["Face with open mouth:", "As if saying Wow! or Oh my! May convey such feelings as awe or disbelief, often milder or more ironic in tone than Face Screaming in Fear."], 
// ["Pleading face:", "As if begging, pleading, or yearning (possibly even in a NSFW manner, depending on the context). May also represent adoration or feeling touched by a loving gesture."], 
// ["Person facepalming:", "Used to display frustration or embarrassment at the ineptitude of a person or situation. May be used in a similar context to the acronym SMH (shaking my head)."], 
// ["Grinning face:", "Often conveys general pleasure and good cheer or humor."], 
// ["Slightly frowning face:", "Often conveys a mild degree of concern, disappointment, or sadness, but usually less intensely than Frowning Face."], 
// ["Winking face with tongue:", "Often conveys a sense of fun, excitement, wackiness, buffoonery, or joking."], 
// ["Winking face:", "Tone varies, including playful, affectionate, suggestive, or ironic."], 
// ["Person shrugging:", "A person shrugging their shoulders to indicate a lack of knowledge about a particular topic, or a lack of care about the result of a situation."], 
// ["Unamused face:", "May convey a variety of negative emotions, including irritation, displeasure, grumpiness, and skepticism, as if giving the side-eye."], 
// ["Face screaming in fear:", "Its expression evokes Edvard Munch’s iconic painting The Scream. While intended to represent horror and fright, it commonly conveys such feelings as shock, awe, disbelief, and intense excitement, as a screaming fan."],
// ["Sad but relieved face:", "Also known as Disappointed but Relieved Face, suggesting the smiley is upset but is grateful things didn’t turn out worse. Commonly conveys mild degrees of frustration and sadness."],
// ["Kissing face with closed eyes:", "Commonly conveys sentiments of romantic love and affection."],
// ["Smiling face with smiling eyes:", "Often expresses genuine happiness and warm, positive feelings."], 
// ["Clapping hands:", "Two hands clapping emoji, which when used multiple times can be used as a round of applause."], 
// ["OK hand:", "Represents \"I'm okay\" or \"yes, that's correct / good\"."], 
// ["Sleeping face:", "Indicate it's sound asleep. May also represent boredom (slang, snooze)."], 
// ["Flexed biceps:", "Represents strength, or working out."], 
// ["Partying face:", " Used for celebrating joyous occasions (such as New Year's Eve or World Emoji Day) and enjoying good times more generally."], 
// ["Face with hand over mouth:", "Displays most often with smiling eyes and/or blushing cheeks, suggesting coy laughter or embarrassment, as if cheekily saying Oops!"], 
// ["Anguished face:", "Meaning widely varies, but may convey alarm, confusion, or sadness, as if gasping in shock or concern."], 
// ["Kissing face with smiling eyes:", "Commonly conveys sentiments of love and affection. This emoji is sometimes taken to represent whistling, especially when paired with a musical note. May convey such feelings as surprise, admiration, contempt, or feigned innocence, as a person with hands in pocket casually whistling after wrongdoing, as if saying Nothing to look at here."], 
// ["Relieved face:", "Conveys various pleasant feelings, including contentment, calm, peace, and relief. May also convey feelings of happiness or good-natured humor more generally."], 
// ["Folded hands:", "Meaning please or thank you in Japanese culture. A common alternative use for this emoji is for prayer, using the same gesture as praying hands. It can also represent a respectful greeting or show of adoration many in Southeast Asian religions and cultures, such as the Hindu namaste or Buddhist añjali mudra."], 
// ["Beaming face with smiling eyes:", "Often expresses a radiant, gratified happiness. Tone varies, including warm, silly, amused, or proud."],
// ["Upside-down face:", "Commonly used to convey irony, sarcasm, joking, or a sense of goofiness or silliness."],
// ["Disappointed face:", "May convey a variety of unhappy emotions, including disappointment, grief, stress, regret, and remorse."],
// ["Purple heart:", "A purple heart emoji, often used alongside other colored hearts. Frequently used on Twitter in reference to Korean boy band Bangtan Sonyeondan, more commonly known as BTS."],
// ["Hugging face:", "May be used to offer thanks and support, show love and care, or express warm, positive feelings more generally."],
// ["Downcast face with sweat:", "Meaning widely varies, but commonly conveys a moderate degree of sadness, pain, frustration, or disappointment."],
// ["Party popper:", "A party popper, as explodes in a shower of confetti and streamers at a celebration. Commonly used to convey congratulations and celebration"],
// ["Tired face:", "While intended to represent tiredness, it commonly conveys various degrees and tones of frustration and sadness as well excitement and affection, as if it just can’t handle how great someone or something is."],
// ["Victory hand:", "Most commonly known as a Peace Sign, but traditionally called as a Victory Hand."],
// ["Revolving hearts:", "Hearts revolving around one or more other hearts."]
];
const PRAC_EMOJI_DESCRIPTION = {"68": ["Confused Face:", "A look of feeling unsure. While it can convey confusion or hesitation, it is also commonly used for slight sadness, disappointment, and frustration."],
"108": ["Grinning Cat:", "A cartoon cat variant of Grinning Face. Often conveys general pleasure and good cheer or humor."],
"245": ["Person Gesturing OK:", "A person with arms above their head, making an 'OK' sign (circle) with the whole body. No gender is specified."],
};
const idx = [...Array(EMOJI_FILENAME.length).keys()]
const TRIAL_INPUT = Object.fromEntries(idx.map(x => [x, EMOJI_FILENAME[x]]));
const TEST_EMOJI_DEFINITIONS = Object.fromEntries(idx.map(x => [EMOJI_FILENAME[x], CLARITY_DES[x]]))
const EMOJI_DEFINITIONS = Object.assign(TEST_EMOJI_DEFINITIONS, PRAC_EMOJI_DESCRIPTION);

// criteria
const VIEWPORT_MIN_W = 1000;
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
    subj.id = subj.getID(ID_GET_VARIABLE_NAME);
    subj.saveVisit();
    if (subj.phone) {
        halt_experiment('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at yiling.yun@g.ucla.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
    } else if (subj.validID){
        let ALL_IMG_LIST = INSTR_IMG_LIST.concat(THREE_EMOJI_EXAMPLE, DIFF_EMOJIS);
        load_img(0, STIM_PATH, ALL_IMG_LIST);
        instr = new instrObject(instr_options);
        instr.start();
    }
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
instr_text[5] = "At the top of each page, there will be a prompt. Your job is to rate each emoji shown in accordance to the prompt provided. You will have to rate each emoji in accordance to multiple prompts.";
instr_text[6] = "There will be 7 prompts to respond to including visual complexity, familiarity, frequency of use, emotional valence, emotional arousal, visual appeal, and clarity.";
instr_text[7] = "You will make the selection by clicking on the button that corresponds to your rating. If you do not know the emoji, please select the \"I don't know this emoji\" option.";
instr_text[8] = "Once you have rated all of the emojis, you can continue to the next trial.";
instr_text[9] = "You will see different emojis, not just faces.";
instr_text[10] = "Let's try a few times on the next page!";
instr_text[11] = "";
instr_text[12] = "We hope that was clear!<br /><br />By the way, you don't need to spend too much time thinking about what to choose. Just follow your intuition.";
instr_text[13] = "The next page is a quick instruction quiz. (It's very simple!)";
instr_text[14] = "Great! You can press SPACE to start. Please focus after you start. (Don't switch to other windows or tabs!).<br><br>Please try your best, but please also know that this task is supposed to be hard; so don't worry if you find it difficult!";

const INSTR_FUNC_DICT = {
    0: SHOW_INSTR,
    1: SHOW_INSTR,
    2: SHOW_INSTR,
    3: SHOW_MAXIMIZE_WINDOW,
    4: SHOW_NO_MUSIC,
    5: SHOW_ONE_EMOJI,
    6: HIDE_EMOJIS,
    7: SHOW_PRACTICE_RATING,
    8: SHOW_INSTR,
    9: SHOW_DIFF_EMOJIS,
    10: HIDE_EMOJIS,
    11: SHOW_TASK,
    12: SHOW_INSTR,
    13: SHOW_INSTR_QUIZ,
    14: SHOW_CONSENT
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
        $("#instrStimBox").css("flex-direction", "row");
    }
    $("#instrStimBox img").css("margin", "100px 0px");
    LOAD_BUFFERS(0); // buffer first practice trial
}

function HIDE_EMOJIS() {
    $("#instrStimBox").css("display", "none");
    practice = new trialObject(prac_trial_options);
    activeTrial = practice;
    activeTrial.dimensionOrder = [
        ORDER_OF_DIMENSIONS[0],
        ORDER_OF_DIMENSIONS[1],
        ORDER_OF_DIMENSIONS[2],
        ORDER_OF_DIMENSIONS[3],
        ORDER_OF_DIMENSIONS[4],
        ORDER_OF_DIMENSIONS[5],
        ORDER_OF_DIMENSIONS[6]
    ];
}

function SHOW_PRACTICE_RATING() {
    SHOW_INSTR_IMG('practice_rating.png');
    $('#instrImg').css('width', '800px');
    $('#instrImg').css('padding', '50px 0px');
}

function SHOW_TASK() {
    subj.detectVisibilityStart();
    $('#instrBox').hide();
    $('#allDimensionsContainer').show();
    $('#clarityContainer').hide();
    INIT_TRIAL();
    $('#taskBox').show();
    CLEAR_RADIO_BUTTONS();
}

function SHOW_INSTR_QUIZ() {
    $('#instrBox').hide();
    $('#quizBox').show();
    test = new trialObject(trial_options);
    //xxx: uncommented the following two lines to test in local
    // activeTrial.trialInput = TRIAL_INPUT;
    activeTrial.trialN = Object.keys(activeTrial.trialInput).length;
    //xxx: commented the following line to test in local
    // import_json(test, subj.num);
    activeTrial = test;
    activeTrial.dimensionOrder = [
        ORDER_OF_DIMENSIONS[0],
        ORDER_OF_DIMENSIONS[1],
        ORDER_OF_DIMENSIONS[2],
        ORDER_OF_DIMENSIONS[3],
        ORDER_OF_DIMENSIONS[4],
        ORDER_OF_DIMENSIONS[5],
        ORDER_OF_DIMENSIONS[6]
    ];
    LOAD_BUFFERS(0); // buffer first trial
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
    } else if (CHOICE != 'ratePrompt') {
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
    $('#trialNextBut').hide();
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
    let progress = Math.round((activeTrial.dimensionIndex + activeTrial.clarityIndex)/(activeTrial.trialN * (NUM_DIMENSIONS + EMOJIS_PER_PAGE)) * 100);
    $("#progress").html(progress + "% completed");

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
    activeTrial.rt !== undefined ? activeTrial.rt.push(decideTime - activeTrial.startTime) : activeTrial.rt = [decideTime - activeTrial.startTime];

    //enable to proceed to the next trial
    $("#trialNextBut").show(); //xxx: (Pro: no easy get through the trials) alt: press SPACE BAR (Pro: no visual bias)
}

var radioButtons = $("input[type='radio']");
radioButtons.click(() => {
    const rating1Checked = $('input[name="rating1"]').is(":checked");
    const rating2Checked = $('input[name="rating2"]').is(":checked");
    const rating3Checked = $('input[name="rating3"]').is(":checked");
    const ratingClarityChecked = $('input[name="rating5"]').is(":checked");
    if (
        (rating1Checked || $('.firstEmoji').is(":hidden")) &&
        (rating2Checked || $('.secondEmoji').is(":hidden")) &&
        (rating3Checked || $('.thirdEmoji').is(":hidden")) ||
        ratingClarityChecked
    ) {
        SELECT(this);
    }
});

function CLEAR_RADIO_BUTTONS() {
    $('input[name="rating1"]').prop("checked", false);
    $('input[name="rating2"]').prop("checked", false);
    $('input[name="rating3"]').prop("checked", false);
    $('input[name="rating5"]').prop("checked", false);
}

function GET_RADIO_VALUES() {
    return [
        $('input[name=rating1]:checked').val(),
        $('input[name=rating2]:checked').val(),
        $('input[name=rating3]:checked').val()
    ];
}

function NEXT_TRIAL() {
    // if the current dimension is the clarity dimension
    if (ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS] == NUM_DIMENSIONS - 1) {
        activeTrial.clarity !== undefined ? activeTrial.clarity.push($('input[name=rating5]:checked').val()) : activeTrial.clarity = [$('input[name=rating5]:checked').val()];
        if (
            (activeTrial.clarityIndex % EMOJIS_PER_PAGE == 0) ||
            (EMOJIS_PER_PAGE * activeTrial.trialIndex + (activeTrial.clarityIndex % EMOJIS_PER_PAGE)) >= activeTrial.numEmojis
        ){
            activeTrial.dimensionIndex = activeTrial.dimensionIndex + 1; // continue to next dimension
        }
    }
    else {
        // store correct ratings for the corresponding dimension

        if (ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS] == 0) {
            activeTrial.visualComplexity = GET_RADIO_VALUES();
        }

        if (ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS] == 1) {
            activeTrial.familiarity = GET_RADIO_VALUES();
        }

        if (ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS] == 2) {
            activeTrial.frequency = GET_RADIO_VALUES();
        }

        if (ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS] == 3) {
            activeTrial.emotionalValence = GET_RADIO_VALUES();
        }

        if (ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS] == 4) {
            activeTrial.emotionalArousal = GET_RADIO_VALUES();
        }

        if (ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS] == 5) {
            activeTrial.visualAppeal = GET_RADIO_VALUES();
        }

        // increment dimension index
        activeTrial.dimensionIndex = activeTrial.dimensionIndex + 1;
    }

    // go to next set of emojis
    if (
        activeTrial.dimensionIndex % NUM_DIMENSIONS == 0 &&
        activeTrial.clarityIndex % EMOJIS_PER_PAGE == 0
    ) {
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
    let currentDimensionIndex = ORDER_OF_DIMENSIONS[activeTrial.dimensionIndex % NUM_DIMENSIONS];
    let emojiIndex = EMOJIS_PER_PAGE * activeTrial.trialIndex;
    let clarityEmojiIndex = emojiIndex + (activeTrial.clarityIndex % EMOJIS_PER_PAGE);
    LOAD_EMOJIS(emojiIndex);

    activeTrial.exptId = [activeTrial.trialInput[emojiIndex], activeTrial.trialInput[1 + emojiIndex], activeTrial.trialInput[2 + emojiIndex]];
    activeTrial.emojiOne = activeTrial.trialInput[emojiIndex];
    activeTrial.emojiTwo = activeTrial.trialInput[1 + emojiIndex];
    activeTrial.emojiThree = activeTrial.trialInput[2 + emojiIndex];

    // if next dimension is emotional valence dimension, set up buffer image
    if (ORDER_OF_DIMENSIONS[(activeTrial.dimensionIndex % NUM_DIMENSIONS) + 1] == 3) {
        $('#emotionImageBuffer').attr('src', 'stim/emotionalValence.png');
    }

    // if next dimension is emotional arousal dimension, set up buffer image
    if (ORDER_OF_DIMENSIONS[(activeTrial.dimensionIndex % NUM_DIMENSIONS) + 1] == 4) {
        $('#emotionImageBuffer').attr('src', 'stim/emotionalArousal.png');
    }

    // index of 6 equals the clarity dimension
    if (currentDimensionIndex == NUM_DIMENSIONS - 1) {
        // set up the clarity page
        $('#allDimensionsContainer').hide();
        $('#clarityContainer').show();
        $("input[type='radio']").css('margin', 'auto');
        $("#dimensionQuestion").html('<p id="dimensionQuestion"><b>Prompt: </b>' + DIMENSIONS[currentDimensionIndex] + '</p>')
        clarityEmoji = activeTrial.trialInput[clarityEmojiIndex];
        $('#clarityEmoji').attr('src', activeTrial.stimPath + clarityEmoji +'.png');
        $('#emojiDefinition').html('<p id="emojiDefinition"><b>' + EMOJI_DEFINITIONS[clarityEmoji][0] + '</b> ' + EMOJI_DEFINITIONS[clarityEmoji][1] + '</p>');

        activeTrial.clarityIndex = activeTrial.clarityIndex + 1;
    }
    else {
        // set up next dimension
        $('#allDimensionsContainer').show();
        $('#clarityContainer').hide();
        $("#dimensionQuestion").html('<p id="dimensionQuestion"><b>Prompt: </b>' + DIMENSIONS[currentDimensionIndex] + '</p>')
        $(".lowerScale").text(LOWER_SCALES[currentDimensionIndex]);
        $(".upperScale").text(UPPER_SCALES[currentDimensionIndex]);

        // show emotional dimension images if dimension is emotional valence or emotional arousal
        // index of 3 refers to emotional valence dimension
        if (currentDimensionIndex == 3) {
            $(".emotionDimension").show();
            // $("input[type='radio']").css('margin', '20px');
            $("input[value='1']").css('margin-left', '48px');

            $("#scaleNumbersContainer").hide();
            $('#emotionImage').attr('src', 'stim/emotionalValence.png');
        }
        // index of 4 refers to emotional arousal dimension
        else if (currentDimensionIndex == 4) {
            $(".emotionDimension").show();
            $("input[type='radio']").css('margin', '20px');
            $("input[value='1']").css('margin-left', '48px');

            $("#scaleNumbersContainer").hide();
            $('#emotionImage').attr('src', 'stim/emotionalArousal.png');
        }
        else {
            $(".emotionDimension").hide();
            $("#scaleNumbersContainer").show();
            $("input[type='radio']").css('margin', 'auto');
        }
    }

    //buffer next trial
    if (activeTrial.trialIndex + 1 < activeTrial.trialN){
        let emojiIndex = EMOJIS_PER_PAGE * (activeTrial.trialIndex + 1);
        LOAD_BUFFERS(emojiIndex);
    }

    //update interface structure
    $("#stimuliBox img").css("border", "#f9f9f9");
    $("#stimuliBox").show();
};

// list of variables to be save, the variable names
// trialobject uses these strings to get the variables in the code
const TRIAL_TITLES = [
    "subjNum",
    "subjStartDate",
    "subjStartTime",
    "trialType",
    "trialIndex",
    "exptId",
    "dimensionOrder",
    "emojiOne",
    "emojiTwo",
    "emojiThree",
    "visualComplexity",
    "familiarity",
    "frequency",
    "emotionalValence",
    "emotionalArousal",
    "visualAppeal",
    "clarity",
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
