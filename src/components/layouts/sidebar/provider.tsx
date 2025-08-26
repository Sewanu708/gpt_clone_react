import { BiCheck } from "react-icons/bi"
import { aiModels, models } from "../../../data"
import { useModel, useModels } from "../../../store/model"





function Models() {
    const selectedmodel = useModels(state => state.ai)
    const selectmodel = useModels(state => state.saveResponse)
    const saveSelectedmodel = useModel(state => state.saveResponse)
    const handleOnChange = (value: 'google' | 'openai' | 'xai' | 'anthropic') => {
        const defaultModel = aiModels[value][0]
        saveSelectedmodel(defaultModel.name)
        selectmodel(value)
    }


    return (
        <div className="w-64 p-2 rounded-lg bg-white shadow-sm">
            <div className="text-sm  text-zinc-600 px-2 mb-1">
                Models
            </div>

            {
                models.map((model, index) => {
                    const matchedmodel = model.key === selectedmodel
                    return <div className='p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between w-full' key={index} onClick={() => handleOnChange(model.key as 'google' | 'openai' | 'xai' | 'anthropic')}>
                        <div className="flex items-center justify-start gap-2">
                            <div className="w-4 h-4  rounded-sm">
                                <img src={model.icon} alt={model.name} />
                            </div>
                            <div className="text-sm font-500">
                                {model.name}
                            </div>
                        </div>

                        {
                            matchedmodel && <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center">
                                <BiCheck color="white" className="w-3 h-3" />
                            </div>

                        }
                    </div>
                })
            }
        </div>
    )
}

export default Models