import { PropsWithChildren, useCallback, useState } from "react"
import { StepsProps } from "./types"

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid"
import { Button } from "../Button"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
export const Steps: React.FC<PropsWithChildren<StepsProps>> = (props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [doneSteps, setDoneSteps] = useState<number[]>([])

  const handleNext = useCallback(() => {
    setCurrentStepIndex((prev) => {
      setDoneSteps((oldDoneSteps) => {
        return oldDoneSteps.includes(prev + 1)
          ? oldDoneSteps
          : [...oldDoneSteps, prev]
      })
      return prev + 1
    })
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentStepIndex((prev) => prev - 1)
  }, [])

  return (
    <>
      <nav aria-label="Progress" className={props.className}>
        <ol className="flex items-center">
          {props.stepData.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== props.stepData.length - 1 ? "pr-8 sm:pr-20" : "",
                "relative"
              )}>
              {step.status === "complete" ||
              (doneSteps.includes(stepIdx) &&
                !(
                  step.status === "current" || currentStepIndex === stepIdx
                )) ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true">
                    <div
                      className={classNames(
                        "h-0.5",
                        "w-full",
                        doneSteps.includes(stepIdx + 1) ||
                          stepIdx + 1 === currentStepIndex
                          ? "bg-amber-400"
                          : "bg-gray-200"
                      )}
                    />
                  </div>
                  <button className="relative w-8 h-8 flex items-center justify-center bg-amber-400 rounded-full hover:bg-amber-700">
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              ) : step.status === "current" || currentStepIndex === stepIdx ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true">
                    <div
                      className={classNames(
                        "h-0.5",
                        "w-full",
                        doneSteps.includes(stepIdx + 1)
                          ? "bg-amber-400"
                          : "bg-gray-200"
                      )}
                    />
                  </div>
                  <button
                    className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-amber-400 rounded-full"
                    aria-current="step">
                    <span
                      className="h-2.5 w-2.5 bg-amber-400 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <button className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400">
                    <span
                      className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="my-8 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl text-center text-amber-400 leading-7 md:leading-10">
        {props.stepData[currentStepIndex].name}
      </h1>
      {props.stepData[currentStepIndex].children}
      <div className="flex flex-row">
        {currentStepIndex !== 0 && (
          <Button className="mx-2" onClick={handlePrev}>
            <ChevronLeftIcon className="h-5 w-5  mt-[2px]" aria-hidden="true" />

            {props.stepData[currentStepIndex].prevTitle || "Geri"}
          </Button>
        )}
        {currentStepIndex !== props.stepData.length - 1 && (
          <Button
            className="mx-2 flex items-center justify-center"
            onClick={handleNext}
            disabled={!props.stepData[currentStepIndex].continueCondition}>
            {props.stepData[currentStepIndex].nextTitle || "İleri"}
            <ChevronRightIcon className="h-5 w-5 mt-[2px]" aria-hidden="true" />
          </Button>
        )}
        {currentStepIndex === props.stepData.length - 1 && (
          <Button
            className="mx-2"
            onClick={handleNext}
            disabled={!props.stepData[currentStepIndex].continueCondition}>
            {props.finishText || "Sonlandır"}
          </Button>
        )}
      </div>
    </>
  )
}

export default Steps
