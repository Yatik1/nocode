function Link(props: {
    text?: string,
    link?: string,
    color?: string,
    fontStyle?: string,
    decoration?: string,
}) {
    if (props.text && props.link) {
        return <a
            style={{
                color: props.color,
                fontStyle: props.fontStyle,
                textDecoration: props.decoration
            }}
            href={props.link}
            target="_blank">
            {props.text}
        </a>
    }
    return <a href="#">This is a link</a>
}

export default Link;