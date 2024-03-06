// options.js
$(document).ready(function () {
    const defaultOptions = {
        pairs: 2,
        difficulty: 'normal'
    };

    const pairs = $('#pairs');
    const difficulty = $('#dif');

    const options = JSON.parse(localStorage.options || JSON.stringify(defaultOptions));
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);

    pairs.on('change', function () {
        options.pairs = pairs.val();
    });

    difficulty.on('change', function () {
        options.difficulty = difficulty.val();
    });

    window.options = {
        applyChanges: function () {
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function () {
            options.pairs = defaultOptions.pairs;
            options.difficulty = defaultOptions.difficulty;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
        }
    };

    $('#default').on('click', function () {
        options.defaultValues();
    });

    $('#apply').on('click', function () {
        options.applyChanges();
        location.assign("../");
    });
});
