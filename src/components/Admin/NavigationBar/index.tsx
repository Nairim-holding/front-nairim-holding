"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavigationBarProps } from './type';
import IconTelephone from '@/components/Icons/IconTelephone';

export default function NavigationBar({ formComplete, allEnabled = false, steps }: NavigationBarProps) {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [enabledSteps, setEnabledSteps] = useState<boolean[]>(new Array(steps.length).fill(false));

  useEffect(() => {
    const currentIndex = steps.findIndex(step => step.path === pathname);
    setActiveStep(currentIndex >= 0 ? currentIndex : 0);

    if (allEnabled) {
      setEnabledSteps(new Array(steps.length).fill(true));
      return;
    }

    const loadedSteps = steps.map((step, index) => {
      const hasLocal = !!localStorage.getItem(step.key);
      const isCurrent = index === currentIndex;
      return hasLocal || isCurrent;
    });

    if (currentIndex >= 0 && localStorage.getItem(steps[currentIndex]?.key) && currentIndex + 1 < steps.length) {
      loadedSteps[currentIndex + 1] = true;
    }

    setEnabledSteps(loadedSteps);
  }, [formComplete, allEnabled, pathname, steps]);

  return (
    <div className="flex border-b-2 pb-3 border-[#11111180] dark:border-[#fff]">
      <ul className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isEnabled = enabledSteps[index];

          const commonClasses = `flex items-center gap-2 px-5 py-3 border border-[#E0E0E0] dark:bg-[#12101D] rounded-xl drop-shadow-custom-black ${
            isActive
              ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] drop-shadow-purple-soft text-white'
              : 'bg-[#F0F0F0] text-[#666666]'
          }`;

          return (
            <li key={step.path}>
              {isEnabled ? (
                <Link href={step.path} className={commonClasses}>
                  {renderIcon(step.icon, isActive)}
                  <p className="text-[18px] font-medium font-poppins">{step.label}</p>
                </Link>
              ) : (
                <div className={`${commonClasses} pointer-events-none opacity-50 cursor-not-allowed`}>
                  {renderIcon(step.icon, isActive)}
                  <p className="text-[18px] font-medium font-poppins">{step.label}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function renderIcon(index: number, isActive: boolean) {
  const fill = isActive ? '#fff' : '#666';
  switch (index) {
    case 0:
      return (
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="dark:fill-[#fff]" d="M3 20V10.625L1.2 12L0 10.4L3 8.1V5H5V6.575L11 2L22 10.4L20.8 11.975L19 10.625V20H3ZM5 18H10V14H12V18H17V9.1L11 4.525L5 9.1V18ZM3 4C3 3.16667 3.29167 2.45833 3.875 1.875C4.45833 1.29167 5.16667 1 6 1C6.28333 1 6.52083 0.904167 6.7125 0.7125C6.90417 0.520833 7 0.283333 7 0H9C9 0.833333 8.70833 1.54167 8.125 2.125C7.54167 2.70833 6.83333 3 6 3C5.71667 3 5.47917 3.09583 5.2875 3.2875C5.09583 3.47917 5 3.71667 5 4H3Z" fill={fill} />
        </svg>
      );
    case 1:
      return (
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="dark:fill-[#fff]" d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z" fill={fill} />
        </svg>
      );
    case 2:
      return (
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="dark:fill-[#fff]" d="M4.02422 18V15.85C3.14089 15.65 2.37839 15.2667 1.73672 14.7C1.09505 14.1333 0.624219 13.3333 0.324219 12.3L2.17422 11.55C2.42422 12.35 2.79505 12.9583 3.28672 13.375C3.77839 13.7917 4.42422 14 5.22422 14C5.90755 14 6.48672 13.8458 6.96172 13.5375C7.43672 13.2292 7.67422 12.75 7.67422 12.1C7.67422 11.5167 7.49089 11.0542 7.12422 10.7125C6.75755 10.3708 5.90755 9.98333 4.57422 9.55C3.14089 9.1 2.15755 8.5625 1.62422 7.9375C1.09089 7.3125 0.824219 6.55 0.824219 5.65C0.824219 4.56667 1.17422 3.725 1.87422 3.125C2.57422 2.525 3.29089 2.18333 4.02422 2.1V0H6.02422V2.1C6.85755 2.23333 7.54505 2.5375 8.08672 3.0125C8.62839 3.4875 9.02422 4.06667 9.27422 4.75L7.42422 5.55C7.22422 5.01667 6.94089 4.61667 6.57422 4.35C6.20755 4.08333 5.70755 3.95 5.07422 3.95C4.34089 3.95 3.78255 4.1125 3.39922 4.4375C3.01589 4.7625 2.82422 5.16667 2.82422 5.65C2.82422 6.2 3.07422 6.63333 3.57422 6.95C4.07422 7.26667 4.94089 7.6 6.17422 7.95C7.32422 8.28333 8.19505 8.8125 8.78672 9.5375C9.37839 10.2625 9.67422 11.1 9.67422 12.05C9.67422 13.2333 9.32422 14.1333 8.62422 14.75C7.92422 15.3667 7.05755 15.75 6.02422 15.9V18H4.02422Z" fill={fill} />
        </svg>
      );
    case 3: 
      return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" color="#666" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
          <path fill={fill} d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57a.84.84 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1z"></path>
        </svg>
      );
    case 4:
      return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill={fill} d="M7 12.5H17L13.55 8L11.25 11L9.7 9L7 12.5ZM6 16.5C5.45 16.5 4.97917 16.3042 4.5875 15.9125C4.19583 15.5208 4 15.05 4 14.5V2.5C4 1.95 4.19583 1.47917 4.5875 1.0875C4.97917 0.695833 5.45 0.5 6 0.5H18C18.55 0.5 19.0208 0.695833 19.4125 1.0875C19.8042 1.47917 20 1.95 20 2.5V14.5C20 15.05 19.8042 15.5208 19.4125 15.9125C19.0208 16.3042 18.55 16.5 18 16.5H6ZM6 14.5H18V2.5H6V14.5ZM2 20.5C1.45 20.5 0.979167 20.3042 0.5875 19.9125C0.195833 19.5208 0 19.05 0 18.5V4.5H2V18.5H16V20.5H2Z"/>
        </svg>
      );
    default:
      return null;
  }
}
