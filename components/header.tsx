'use client';

import WidthWrapper from './width-wrapper';
import { useMediaQuery } from 'react-responsive';

interface HeaderProps {
    heading: string;
    subtitle?: string;
}

const Header = ({ heading, subtitle }: HeaderProps) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isMidium = useMediaQuery({ query: '(max-width: 1060px)' });

    return (
        <div className="relative">
            <svg
                id="wave"
                style={{
                    transform: 'rotate(180deg)',
                    transition: '0.3s',
                    minHeight: '130px',
                    width: '100%',
                    overflowX: 'hidden',
                }}
                viewBox={`0 0 ${isMobile ? 510 : isMidium ? 600 : '1100'} 130`}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                        <stop stopColor="rgba(6, 171, 221, 0.4)" offset="0%"></stop>
                        <stop stopColor="rgba(30, 115, 190, 0.4)" offset="100%"></stop>
                    </linearGradient>
                </defs>

                <path
                    style={{ transform: 'translate(0, 0px)', opacity: 0.1 }}
                    fill="url(#sw-gradient-0)"
                    d="M0,0L30,8C60,16,120,32,180,37.3C240,43,300,37,360,37.3C420,37,480,43,540,48C600,53,660,59,720,58.7C780,59,840,53,900,48C960,43,1020,37,1080,40C1140,43,1200,53,1260,56C1320,59,1380,53,1100,50.7C1500,48,1560,48,1620,45.3C1680,43,1740,37,1800,34.7C1860,32,1920,32,1980,34.7C2040,37,2100,43,2130,48C2220,53,2280,59,2340,53.3C2400,48,2460,32,2520,29.3C2580,27,2640,37,2700,42.7C2760,48,2820,48,2880,58.7C2940,69,3000,91,3060,104C3120,117,3180,123,3240,125.3C3300,128,3360,128,3420,106.7C3480,85,3540,43,3600,37.3C3660,32,3720,64,3780,64C3840,64,3900,32,3960,26.7C4020,21,4080,43,4140,58.7C4200,75,4260,85,4290,90.7L4320,96L4320,130L4290,130C4260,130,4200,130,4140,130C4080,130,4020,130,3960,130C3900,130,3840,130,3780,130C3720,130,3660,130,3600,130C3540,130,3480,130,3420,130C3360,130,3300,130,3240,130C3180,130,3120,130,3060,130C3000,130,2940,130,2880,130C2820,130,2760,130,2700,130C2640,130,2580,130,2520,130C2460,130,2400,130,2340,130C2280,130,2220,130,2130,130C2100,130,2040,130,1980,130C1920,130,1860,130,1800,130C1740,130,1680,130,1620,130C1560,130,1500,130,1100,130C1380,130,1320,130,1260,130C1200,130,1140,130,1080,130C1020,130,960,130,900,130C840,130,780,130,720,130C660,130,600,130,540,130C480,130,420,130,360,130C300,130,240,130,180,130C120,130,60,130,30,130L0,130Z"
                ></path>
            </svg>
            <div className="absolute top-5 lg:top-9">
                <WidthWrapper>
                    <h1 className="text-2xl lg:text-3xl font-bold text-neutral-700">{heading}</h1>
                    <p className="text-slate-900 text-sm font-normal">{subtitle}</p>
                </WidthWrapper>
            </div>
        </div>
    );
};

export default Header;

// 'use client';

// import WidthWrapper from './width-wrapper';
// import { useMediaQuery } from 'react-responsive';

// interface HeaderProps {
//     heading: string;
//     subtitle?: string;
// }

// const Header = ({ heading, subtitle }: HeaderProps) => {
//     const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
//     const isMidium = useMediaQuery({ query: '(max-width: 1060px)' });

//     return (
//         <div className="py-5">
//             <WidthWrapper>
//                 <h1 className="text-2xl lg:text-3xl font-bold text-dark-500">{heading}</h1>
//                 <p className="text-dark-500 text-sm font-normal">{subtitle}</p>
//                 <div className="border-b-4 border-primary-400 w-1/4 rounded-lg mt-5" />
//             </WidthWrapper>
//         </div>
//     );
// };

// export default Header;
