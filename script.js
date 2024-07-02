
$(document).ready(function() {
    let index = 1;
    let activeSection = null;

    function addOption(type, container) {
        let optionIndex = container.children().length + 1;
        let optionHtml;
        if (type === 'multiple-choice' || type === 'checkboxes') {
            optionHtml = `
                <div class="option">
                    <input type="${type === 'multiple-choice' ? 'radio' : 'checkbox'}" disabled>
                    <input type="text" class="form-control option-label" value="Option ${optionIndex}">
                    <span class="delete-option-icon">&times;</span>
                </div>
            `;
        } else if (type === 'dropdown') {
            optionHtml = `
                <div class="option">
                    <input type="text" class="form-control option-label" value="Option ${optionIndex}">
                    <span class="delete-option-icon">&times;</span>
                </div>
            `;
        }
        container.append(optionHtml);
    }

    function refreshOptionNumbers(container) {
        container.find('.option').each(function(index) {
            $(this).find('.option-label').val(`Option ${index + 1}`);
        });
    }

    function createFormSection() {
        let newSection = `
            <div class="form-section" data-index="${index}">
                <div class="header-row">
                    ${index === 1 ? '<div class="violet-border"></div>' : ''}
                    <textarea class="form-control untitled-question" placeholder="Untitled Question" rows="1"></textarea>
                    <select class="custom-select">
                        <option value="short-answer">Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="checkboxes">Checkboxes</option>
                        <option value="dropdown">Dropdown</option>
                    </select>
                    <span class="delete-section-icon"><i class="fas fa-trash-alt"></i></span>
                </div>
                <div class="options-container"></div>
            </div>
        `;
        $('#form-container').append(newSection);
        index++;

        positionAddSectionButton();
    }

    function positionAddSectionButton() {
        if (activeSection) {
            let position = activeSection.position();
            let buttonWidth = $('#add-section-btn').outerWidth();
            let buttonHeight = $('#add-section-btn').outerHeight();

            $('#add-section-btn').css({
                position: 'absolute',
                left: position.left - buttonWidth - 47 + 'px',
                top: position.top + activeSection.height() / 2 - buttonHeight / 2 + 'px'
            });
        } else {
            let containerPosition = $('#form-container').position();
            let buttonWidth = $('#add-section-btn').outerWidth();
            let buttonHeight = $('#add-section-btn').outerHeight();

            $('#add-section-btn').css({
                position: 'absolute',
                left: containerPosition.left + 'px',
                top: containerPosition.top + $('#form-container').height() + 20 + 'px'
            });
        }
    }

    $('#add-section-btn').on('click', function() {
        createFormSection();
        $('.form-section').removeClass('active');
        activeSection = $('.form-section').last();
        activeSection.addClass('active');
        positionAddSectionButton();
    });

    $(document).on('change', '.custom-select', function() {
        let type = $(this).val();
        let container = $(this).closest('.form-section').find('.options-container');
        container.empty();

        $(this).closest('.form-section').find('.add-option-btn').remove();

        if (type === 'short-answer') {
            container.append('<input type="text" class="form-control" disabled placeholder="Short answer text">');
        } else if (type === 'paragraph') {
            container.append('<textarea class="form-control" disabled placeholder="Paragraph text"></textarea>');
        } else {
            addOption(type, container);
            $(this).closest('.form-section').append('<button class="btn btn-secondary add-option-btn">Add Option</button>');
        }
    });

    $(document).on('click', '.add-option-btn', function() {
        let type = $(this).closest('.form-section').find('.custom-select').val();
        let container = $(this).closest('.form-section').find('.options-container');
        addOption(type, container);
        refreshOptionNumbers(container);
    });

    $(document).on('click', '.delete-section-icon', function() {
        let section = $(this).closest('.form-section');
        let prevSection = section.prev('.form-section');
        let nextSection = section.next('.form-section');
        section.remove();
        if (section.hasClass('active')) {
            activeSection = null;
        }
        if (prevSection.length > 0) {
            prevSection.find('.delete-section-icon').appendTo(prevSection.find('.form-section'));
            activeSection = prevSection;row
        } 
        else if (nextSection.length > 0) {
            nextSection.find('.delete-section-icon').appendTo(nextSection.find('.form-header'));
            activeSection = nextSection;
        }

        positionAddSectionButton();
    });

    $(document).on('click', '.delete-option-icon', function() {
        let option = $(this).closest('.option');
        let container = option.closest('.options-container');
        option.remove();
        refreshOptionNumbers(container);
    });

    $('#preview-btn').on('click', function() {
        let previewWindow = window.open('', '_blank');
        let previewContent = `
            <html>
            <head>
                <title>Form Preview</title>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { background-color: rgb(240, 235, 248); }
                    .container { margin-top: 30px; }
                    .form-section {background-color: white;width: 56%;margin-bottom: 30px;margin-left: 240px;padding: 20px;position: relative;align-items: center;border-radius: 10px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                    .form-header {background-color: white;padding: 20px;margin-bottom: 10px;margin-left: 240px;border-radius: 10px 10px 0 0;display: flex;justify-content: space-between;align-items: center; position: relative;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-top: 10px solid rgb(103, 58, 183);width: 56%; }
                    .form-section h2 { text-align: center; margin-bottom: 30px; }
                    .form-section .question-section { margin-bottom: 20px; } /* Add margin-bottom to the question section */
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="form-header">
                        <h2>Untitled Form</h2>
                    </div>
        `;
        $('.form-section').each(function() {
            previewContent += '<div class="form-section">';
            previewContent += '<div class="question-section">';
            previewContent += '<textarea class="form-control question-label" disabled>' + $(this).find('.untitled-question').val() + '</textarea>';
            previewContent += '</div>';
            let type = $(this).find('.custom-select').val();
            let optionsContainer = $(this).find('.options-container');
            if (type === 'multiple-choice') {
                optionsContainer.find('.option').each(function() {
                    previewContent += `
                        <div class="option">
                            <input type="radio" name="option-${index}">
                            <label>${$(this).find('.option-label').val()}</label>
                        </div>
                    `;
                });
            } else if (type === 'checkboxes') {
                optionsContainer.find('.option').each(function() {
                    previewContent += `
                        <div class="option">
                            <input type="checkbox">
                            <label>${$(this).find('.option-label').val()}</label>
                        </div>
                    `;
                });
            } else if (type === 'short-answer') {
                previewContent += '<input type="text" class="form-control" placeholder="Short answer text">';
            } else if (type === 'paragraph') {
                previewContent += '<textarea class="form-control" placeholder="Paragraph text"></textarea>';
            } else if (type === 'dropdown') {
                let dropdownHtml = '<select class="form-control">';
                optionsContainer.find('.option .option-label').each(function() {
                    dropdownHtml += `<option>${$(this).val()}</option>`;
                });
                dropdownHtml += '</select>';
                previewContent += dropdownHtml;
            }
            previewContent += '</div>';
        });
        previewContent += `
                    <button class="btn btn-success" style = "margin-left: 240px; margin-top: 20px ">Submit</button>
                </div>
            </body>
            </html>
        `;
        previewWindow.document.write(previewContent);
        previewWindow.document.close();
    });


    $(document).on('click', '.form-section', function() {
        $('.form-section').removeClass('active');
        $(this).addClass('active');
        activeSection = $(this);
        positionAddSectionButton();
    });

    $('#form-container').sortable({
        placeholder: 'ui-state-highlight',
        start: function (event, ui) {
            ui.placeholder.height(ui.item.height());
        },
        stop: function (event, ui) {
            positionAddSectionButton();
        }
    });

    $('#form-container').disableSelection();
});
