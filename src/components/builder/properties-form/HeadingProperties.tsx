import useBuilder from '../../../hooks/useBuilder';
import { ElementType } from '../../../types/types';
import { BuilderContextProps } from '../../../context/BuilderContext';
import BackgroundColorPicker from './utils/BackgroundColorPicker';
import TextColorPicker from './utils/TextColorPicker';
import TextChangeUtil from './utils/TextChangeUtil';

function HeadingProperties({ element }: { element: ElementType }) {
  const { props } = element;
  const { updateElementProps } = useBuilder() as BuilderContextProps;

  function onChangeLevel(level: string) {
    updateElementProps({ ...element, props: { ...props, level } });
  }  

  const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
      <label className="text-sm font-semibold">Levels</label>
      <div className="flex items-center justify-between px-2">
        {headingLevels.map((level) => (
          <div
            key={level}
            className={`flex items-center justify-center border border-stone-300 p-3 rounded-md w-7 h-7 cursor-pointer ${
              props.level === level ? "bg-gray-200" : "bg-white text-gray-500"
            }`}
            onClick={() => onChangeLevel(level)}
          >
            <p className="text-sm">{level}</p>
          </div>
        ))}
      </div>

      <TextChangeUtil element={element} />

      <TextColorPicker element={element} />

      <BackgroundColorPicker element={element} />
    </div>
  );
}

export default HeadingProperties;
