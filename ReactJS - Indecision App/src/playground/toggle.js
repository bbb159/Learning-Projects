const appRoot = document.getElementById('app');


let visibility = false;

const toggleVisibility = () => {
    visibility = !visibility;
    renderForever();
}


const renderForever = () => {
    const template = (
        <div>
            <h1>Visibility toggle</h1>
            <button onClick={toggleVisibility}>
                {visibility ? 'esconder' : 'mostra essa porra'}
            </button>
            {visibility && (
                <div>
                    <p>OLOCO MEU</p>
                </div>
            )}
        </div>
    );
    ReactDOM.render(template, appRoot);
};

renderForever();