import { LuCheck } from "react-icons/lu"
import { useModel, useModels } from "../../../store/model"
import { useHeaderToggle } from "../../../store/utils"
import { aiModels } from "../../../data"


function Model() {
    const selectedOrgs = useModels(state => state.ai)
    const saveSelectedmodel = useModel(state => state.saveResponse)
    const selectedmodel = useModel(state => state.model)
    const closeDropdown = useHeaderToggle((state) => state.trigger)
    const models = aiModels[selectedOrgs]
    const saveModel = (value: string) => {
        saveSelectedmodel(value)
        closeDropdown()
    }

    return (
        <div className="w-64 p-2 rounded-lg bg-white shadow-sm">
            <div className="text-sm  text-zinc-600 px-2 mb-1">
                Models
            </div>

            {
                models.map((model, index) => {
                    const matchedmodel = model.name === selectedmodel
                    return <div className='p-2 rounded-lg cursor-pointer hover:bg-zinc-100 flex items-center justify-between w-full' key={index} onClick={() => saveModel(model.name)}>
                        <div className="flex items-center justify-start gap-2">
                            <div className="text-sm font-500">
                                {model.name}
                            </div>
                        </div>

                        {
                            matchedmodel && <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center">
                                <LuCheck color="white" className="w-3 h-3" />
                            </div>

                        }
                    </div>
                })
            }
        </div>
    )
}

export default Model