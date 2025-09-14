import { BuilderContextProps } from '../../../context/BuilderContext';
import useBuilder from '../../../hooks/useBuilder';
import { ElementType } from '../../../types/types'
import TextChangeUtil from './utils/TextChangeUtil'
import TextColorPicker from './utils/TextColorPicker';
import FontStylesUtils from './utils/FontStylesUtils';

function LinkProperties({element} : {element:ElementType}) {
    const {props} = element;
    const {updateElementProps} = useBuilder() as BuilderContextProps;

    function onLinkChange(e: React.ChangeEvent<HTMLInputElement>){
        updateElementProps({...element, props: {...props, link: e.target.value}})
    }

    return(
        <div className='flex flex-1 flex-col gap-[0.56rem]'>
            <TextChangeUtil element={element} propName="text" label="Link Text" />
            <TextChangeUtil element={element} propName="link" label="Redirection URL" />
            <TextColorPicker element={element} />
            <FontStylesUtils element={element} />
        </div>
    )
}

export default LinkProperties