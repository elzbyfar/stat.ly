'use client';
import Image from 'next/image';
import { useMemo, useContext } from 'react';
import { Text, Section } from '@radix-ui/themes';
import AppContext from '@/app/context/AppContext';
import { Player } from '@/app/lib/types';
import { sortBy } from 'lodash';

export default function PlayerPool() {
  const { playerPool } = useContext(AppContext);

  const sortedPlayers = useMemo(() => {
    return sortBy(Object.values(playerPool), (p: Player) => p.order);
  }, [playerPool]);

  return (
    <Section size="1" className="flex justify-center mx-auto">
      {sortedPlayers.map((player: Player, idx: number) => {
        return (
          <div
            key={player.value}
            className="relative group flex pb-20 flex-col w-[3.25rem] items-center justify-center hover:gap-y-1 cursor-pointer transition-all duration-50 ease-out hover:z-10 hover:-mt-4"
          >
            <div className="absolute h-[80px] w-[80px] group-hover:w-[100px] bg-white shadow-[0px_0px_10px_#b0b0b0] group-hover:shadow-[0px_0px_5px_#b0b0b0] group-hover:h-[100px] group-hover:rounded-[60%] group-hover:bg-zinc-300 border-[1px] border-[#e0e0e0] group-hover:border-none flex justify-center overflow-hidden rounded-[100%] transition-all duration-50 ease-in-out">
              <Image
                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.value}.png`}
                alt="player"
                width={100}
                height={100}
                className="grayscale-[60%] h-[105px] w-[105px] group-hover:w-[100px] group-hover:h-[100px] group-hover:rounded-none contrast-[0.80] group-hover:grayscale-0 object-cover group-hover:contrast-[none] transition-all duration-150 ease-in rounded-full "
              />
            </div>
            <div className="absolute bottom-0 text-[0px] flex flex-col group-hover:text-xs opacity-0 w-40 h-max group-hover:opacity-100 transition-all ease-in-out duration-300 text-center text-zinc-800 shadow-[2px_2px_10px_#b0b0b0] group-hover:text-orange-500 font-bold text-nowrap group-hover:z-20 bg-zinc-100 px-4 py-1 rounded-lg">
              <Text size="1">{player.label}</Text>
              <Text size="1">{player.value}</Text>
            </div>
          </div>
        );
      })}
    </Section>
  );
}
