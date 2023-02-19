import React, { useState } from 'react';
import HAPPY from "../../../assets/images/happy.png";

function SelectMenu({ pets, selectedPet, setSelectedPet }) {
    const [show, setShow] = useState(false);

    const showSelectMenu = (e) => {
        setShow(!show);
    }

    const handleSelected = (pet) => (e) => {
        setSelectedPet(pet);
        showSelectMenu();
    }

    return (
        <div>
            <div class="relative mt-1">
                {selectedPet ? (
                    <button onClick={showSelectMenu} type="button" class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-main-color focus:outline-none focus:ring-1 focus:ring-main-color sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                        <span class="flex items-center">
                            <img src={HAPPY} alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                            <span class="ml-3 block truncate">{selectedPet.petName}</span>
                        </span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>
                ) : null}
                {pets && show ? (
                    <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                        {pets?.map(pet => 
                            <li 
                                key={pet?.petId} 
                                class={`${pet?.petId === selectedPet?.petId ? "text-white bg-main-color" : "text-gray-900"} relative cursor-default select-none py-2 pl-3 pr-9`} 
                                id="listbox-option-0" role="option"
                                onClick={handleSelected(pet)}
                            >
                                <div class="flex items-center">
                                    <img src={HAPPY} alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                                    <span class={`${pet?.petId === selectedPet?.petId ? "font-semibold": "font-normal"} ml-3 block truncate`}>{pet?.petName}</span>
                                </div>
                                <span class={`${pet?.petId === selectedPet?.petId ? "text-white" : "text-main-color"} ${pet?.petId === selectedPet?.petId ? "absolute" : "hidden"} inset-y-0 right-0 flex items-center pr-4`}>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                </svg>
                                </span>
                            </li>
                        )}
                    </ul>
                ) : null}
            </div>
        </div>
    )
}

export default SelectMenu
