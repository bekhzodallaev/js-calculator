
const monitor = document.querySelector(".display")
const buttons = document.querySelectorAll(".btn");

buttons.forEach( button => {
    button.addEventListener("click", () => {
        const buttonPressed = button.textContent;

        if( button.id === "c" ){
            monitor.textContent = "0";
            return;
        }

        if( button.id === "delete" ){
            if( monitor.textContent.length === 1 || monitor.textContent === "Error" ){
                monitor.textContent = 0;
            } else {
                monitor.textContent = monitor.textContent.slice(0, -1);
            }
            return;
        }

        if( button.id === "equal" ){
            try{
                monitor.textContent = eval(monitor.textContent)
            } catch {
                monitor.textContent = 'Error'
            }
            return;
        }

        if( monitor.textContent === "0" || monitor.textContent === "Error") {
            monitor.textContent = buttonPressed;
        } else {
            monitor.textContent += buttonPressed;
        }

    })
})

