import * as C from './styles';

type Props = {
    message?: string
}
export const ErrorInput = ({message}: Props) => {
    return (
        <C.Container >
            {message}
        </C.Container>
    )
} 