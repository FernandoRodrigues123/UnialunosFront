
import './campoTexto.css'

function CampoTexto(props) {

    const aoDigitado = (evento) => {
        props.aoAlterado(evento.target.value);
    };

    return (
        <div className="mb-3">
            <label className="form-label">{props.label}</label>
            <input
                type={props.tipo || "text"}
                className="form-control"
                value={props.valor}
                onChange={aoDigitado}
                placeholder={props.placeholder}
            />
        </div>
    );
}


export default CampoTexto;
