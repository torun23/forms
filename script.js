let elementCounter = 0;

function addElement(type) {
    elementCounter++;
    const formContainer = document.getElementById('form-container');

    const newElement = document.createElement('div');
    newElement.classList.add('form-element');
    newElement.setAttribute('role', 'textbox');
    newElement.style.fontFamily = "'docs-Roboto', Arial, sans-serif";
    newElement.style.fontWeight = '400';
    newElement.style.fontSize = '24pt';
    newElement.style.lineHeight = '1.25';
    newElement.style.letterSpacing = '0';
    newElement.style.minHeight = '1.5em';

    newElement.id = `element-${elementCounter}`;

    let elementContent = `<div class="element-header">
                            <h5>${type.charAt(0).toUpperCase() + type.slice(1)}</h5>`;
    
    if (type!== 'hort-answer' && type!== 'paragraph') {
        elementContent += `<button class="btn btn-secondary add-option-btn" onclick="addOption(${elementCounter}, '${type}')">Add Option</button>`;
    }
    
    elementContent += `<button class="btn btn-danger delete-btn" onclick="deleteElement(${elementCounter})">Delete</button>
                        </div>`;

    if (type === 'hort-answer') {
        elementContent += `<input type="text" class="form-control short-answer-input" placeholder="Short Answer">`;
    } else if (type === 'paragraph') {
        elementContent += `<textarea class="form-control paragraph-textarea" rows="4" placeholder="Paragraph"></textarea>`;
    } else if (type === 'ultiple-choice') {
        elementContent += `<div class="option-container">
                              <div class="form-group option-element">
                                <input type="text" class="form-control" placeholder="Option 1" disabled>
                                <button class="btn btn-danger btn-sm ml-2" onclick="deleteOption(this)">Delete</button>
                              </div>
                            </div>`;
    } else if (type === 'checkbox') {
        elementContent += `<div class="option-container">
                              <div class="form-group option-element">
                                <input type="text" class="form-control" placeholder="Option 1" disabled>
                                <button class="btn btn-danger btn-sm ml-2" onclick="deleteOption(this)">Delete</button>
                              </div>
                            </div>`;
    } else if (type === 'dropdown') {
        elementContent += `<div class="option-container">
                              <select class="form-control" disabled>
                                <option value="">Select an option</option>
                              </select>
                            </div>`;
    }

    newElement.innerHTML = elementContent;
    formContainer.appendChild(newElement);
}

function deleteElement(id) {
    const element = document.getElementById(`element-${id}`);
    element.remove();
}

function addOption(elementId, type) {
    const optionContainer = document.querySelector(`#element-${elementId}.option-container`);

    if (type === 'ultiple-choice') {
        const optionCount = optionContainer.children.length + 1;
        const newOption = document.createElement('div');
        newOption.classList.add('form-group', 'option-element');
        newOption.innerHTML = `<input type="text" class="form-control" placeholder="Option ${optionCount}" disabled>
                               <button class="btn btn-danger btn-sm ml-2" onclick="deleteOption(this)">Delete</button>`;
        optionContainer.appendChild(newOption);
    } else if (type === 'checkbox') {
        const optionCount = optionContainer.children.length + 1;
        const newOption = document.createElement('div');
        newOption.classList.add('form-group', 'option-element');
        newOption.innerHTML = `<input type="text" class="form-control" placeholder="Option ${optionCount}" disabled>
                               <button class="btn btn-danger btn-sm ml-2" onclick="deleteOption(this)">Delete</button>`;
        optionContainer.appendChild(newOption);
    } else if (type === 'dropdown') {
        const optionCount = optionContainer.children.length + 1;
        const newOption = document.createElement('option');
        newOption.textContent = `Option ${optionCount}`;
        newOption.disabled = true;
        optionContainer.appendChild(newOption);
    }
}

function deleteOption(option) {
    option.parentElement.remove();
}

function previewForm() {
    const formContainer = document.getElementById('form-container');
    const formElements = formContainer.querySelectorAll('.form-element');

    let previewHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview Form</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'docs-Roboto', Arial, sans-serif;
            font-weight: 400;
            font-size: 24pt;
            line-height: 1.25;
            letter-spacing: 0;
            min-height: 1.5em;
            background-color: rgb(240, 235, 248);
            margin: 20px;
        }
        
      .form-element {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
        }

      .element-header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
      .option-container {
            margin-top: 10px;
        }
        
      .option-element {
            margin-bottom: 10px;
        }
        
      .short-answer-input,.paragraph-textarea {
            border: none;
            background-color: transparent;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            min-height: 1.5em;
            width: 100%;
            resize: none;
            pointer-events: none;
        }
    </style>
</head>
<body>`            
formElements.forEach(element => {
        const type = element.querySelector('.element-header h5').innerText.trim().toLowerCase();
        let elementContent = `<div class="element-header"><h5>${type.charAt(0).toUpperCase() + type.slice(1)}</h5></div>`;
        let content = '';

        if (type === 'hort answer') {
            content = element.querySelector('.short-answer-input').value;
            elementContent += `<textarea class="form-control paragraph-textarea" rows="1" readonly>${content}</textarea>`;
        } else if (type === 'paragraph') {
            content = element.querySelector('.paragraph-textarea').value;
            elementContent += `<textarea class="form-control paragraph-textarea" rows="4" readonly>${content}</textarea>`;
        } else if (type === 'ultiple choice') {
            const options = element.querySelectorAll('.option-container.option-element input[type="text"]');
            content = Array.from(options).map(option => {
                return `<div><input type="radio" name="option-${element.id}"> ${option.value}</div>`;
            }).join('');
            elementContent += `<div class="option-container">${content}</div>`;
        } else if (type === 'checkbox') {
            const options = element.querySelectorAll('.option-container.option-element input[type="text"]');
            content = Array.from(options).map(option => {
                return `<div><input type="checkbox"> ${option.value}</div>`;
            }).join('');
            elementContent += `<div class="option-container">${content}</div>`;
        } else if (type === 'dropdown') {
            const options = element.querySelectorAll('.option-container select option');
            content = Array.from(options).map(option => {
                return `<option>${option.textContent}</option>`;
            }).join('');
            elementContent += `<select class="form-control option-container">${content}</select>`;
        }

        previewHTML += `<div class="form-element">
                            ${elementContent}
                        </div>`;
    });

    previewHTML += `</body>
</html>`;

    // Open preview in new window or tab
    const previewWindow = window.open();
    previewWindow.document.open();
    previewWindow.document.write(previewHTML);
    previewWindow.document.close();
}