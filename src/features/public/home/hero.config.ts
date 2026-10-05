import tubeImage from '../../../assets/hero/machine1.png';
import cubeImage from '../../../assets/hero/machine2.png';
import blockImage from '../../../assets/hero/machine3.png';
import flakeImage from '../../../assets/hero/machine4.png';
import { HeroMachineData } from '../../../types/public.js';

export interface HeroMachineConfig extends HeroMachineData {
  width: number;
  height: number;
}

export const defaultHeroMachines: HeroMachineConfig[] = [
  {
    id: 'hm-tube',
    key: 'tube',
    label: 'Tube',
    name: 'Mesin Es Tube Industri',
    tagline: '1-30 Ton / 24 Jam • SS304 Food Grade',
    imageUrl: tubeImage,
    sortOrder: 1,
    isActive: true,
    width: 600,
    height: 450,
  },
  {
    id: 'hm-cube',
    key: 'cube',
    label: 'Cube',
    name: 'Mesin Es Cube Komersial',
    tagline: '500 kg - 5 Ton • Kristal Padat',
    imageUrl: cubeImage,
    sortOrder: 2,
    isActive: true,
    width: 600,
    height: 450,
  },
  {
    id: 'hm-block',
    key: 'block',
    label: 'Block',
    name: 'Mesin Es Balok Direct Cooling',
    tagline: '5-50 Ton • Tanpa Air Garam (Brine)',
    imageUrl: blockImage,
    sortOrder: 3,
    isActive: true,
    width: 600,
    height: 450,
  },
  {
    id: 'hm-flake',
    key: 'flake',
    label: 'Flake',
    name: 'Mesin Es Flake Marine',
    tagline: '1-20 Ton • Drum SS316 Anti Korosi',
    imageUrl: flakeImage,
    sortOrder: 4,
    isActive: true,
    width: 600,
    height: 450,
  },
];
