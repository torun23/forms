$(document).ready(function() {
    let index = 1;
    let activeSection = null; // Track the currently active section

    function addOption(type, container) {
        let optionIndex = container.children().length + 1;
        let optionHtml;
        if (type === 'multiple-choice' || type === 'checkboxes') {
            optionHtml = `
                <div class="option">
                    <input type="${type === 'multiple-choice' ? 'radio' : 'checkbox'}" disabled>
                    <input type="text" class="form-control option-label" value="Option ${optionIndex}">
                    <button class="btn btn-danger btn-sm delete-option-btn">Delete</button>
                </div>
            `;
        } else if (type === 'dropdown') {
            optionHtml = `
                <div class="option">
                    <input type="text" class="form-control option-label" value="Option ${optionIndex}">
                    <button class="btn btn-danger btn-sm delete-option-btn">Delete</button>
                </div>
            `;
        }
        container.append(optionHtml);
    }

    function createFormSection() {
        let newSection = `
            <div class="form-section" data-index="${index}">
                <div class="header-row">
                    <input type="text" class="form-control untitled-question" placeholder="Untitled Question">
                    <select class="custom-select">
                        <option value="short-answer">Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="checkboxes">Checkboxes</option>
                        <option value="dropdown">Dropdown</option>
                    </select>
                    <button class="btn btn-danger delete-btn">Delete</button>
                </div>
                <div class="options-container"></div>
            </div>
        `;
        $('#form-container').append(newSection);
        index++;

        // Move the add section button next to the newly created section
        positionAddSectionButton();
    }

    function positionAddSectionButton() {
        if (activeSection) {
            let position = activeSection.position();
            let buttonWidth = $('#add-section-btn').outerWidth();
            let buttonHeight = $('#add-section-btn').outerHeight();

            // Set position of the add section button
            $('#add-section-btn').css({
                position: 'absolute',
                left: position.left - buttonWidth - 47 + 'px', // Adjust as needed
                top: position.top + activeSection.height() / 2 - buttonHeight / 2 + 'px' // Adjust as needed
            });
        } else {
            // If no active section, move the button to the bottom of the form container
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
        activeSection = $('.form-section').last(); // Set the newly created section as active
        activeSection.addClass('active');
        positionAddSectionButton();
    });

    $(document).on('change', '.custom-select', function() {
        let type = $(this).val();
        let container = $(this).closest('.form-section').find('.options-container');
        container.empty(); // Clear existing options when dropdown changes

        // Remove any existing "Add Option" button
        $(this).closest('.form-section').find('.add-option-btn').remove();

        if (type === 'short-answer') {
            container.append('<input type="text-area" class="form-control" disabled placeholder="Short answer text">');
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
    });

    $(document).on('click', '.delete-btn', function() {
        let section = $(this).closest('.form-section');
        let prevSection = section.prev('.form-section');
        section.remove();
        if (section.hasClass('active')) {
            activeSection = null; // Reset activeSection if deleted
        }
        if (prevSection.length > 0) {
            prevSection.find('.delete-btn').appendTo(prevSection.find('.header-row'));
        } else {
            // If no previous section, move the delete button to the bottom of the form container
            $('#delete-btn').appendTo('#form-container');
        }
        positionAddSectionButton(); // Re-position add section button
    });

    $(document).on('click', '.delete-option-btn', function() {
        let option = $(this).closest('.option');
        option.remove();
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
                    .form-section { background-color: white; border: 2px solid rgb(103, 58, 183); margin-bottom: 20px; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                    .form-header { background-color: white; border-bottom: 2px solid rgb(103, 58, 183); margin-bottom: 10px; padding: 20px; border-radius: 10px 10px 0 0; display: flex; justify-content: center; align-items: center; }
                    .form-section h2 { text-align: center; margin-bottom: 30px; }
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
            previewContent += '<input type="text" class="form-control question-label" disabled value="' + $(this).find('.question-label').val() + '">';
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
                    <button class="btn btn-success">Submit</button>
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
        activeSection = $(this); // Set the clicked section as active
        positionAddSectionButton();
    });
});
