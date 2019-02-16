console.log('teste');

// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// live-server public

//JSX - JavaScript XML

const appRoot = document.getElementById('app');

const app = {
    title: 'Indecision App',
    subtitle: 'You execute, we do the magic.',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if (option){
        app.options.push(option);
        e.target.elements.option.value = '';
        renderForever();
    }

};

const removeAll = () => {
    app.options = [];
    renderForever();
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
};



const renderForever = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do ?</button>
            <button onClick={removeAll}>Remove all</button>
            <ol>
            {
                app.options.map((option) => <li key={option}>{option}</li>)
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
        );

    ReactDOM.render(template, appRoot);
};

renderForever();