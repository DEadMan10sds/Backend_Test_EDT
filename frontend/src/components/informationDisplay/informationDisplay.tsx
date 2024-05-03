import { Information } from "@/interfaces/InformationDisplay";
import { Separator } from "../ui/separator";

export function InformationDisplay(props: { data: Information[] }) {
  const { data } = props;

  return (
    <div className="pb-24 grid gap-12 ">
      {data.map((dataToShow) => {
        return (
          <div key={dataToShow.title} className="grid gap-4">
            <div>
              <h1 className="font-bold uppercase text-3xl mb-2">
                {dataToShow.title}
              </h1>
              <Separator />
            </div>
            <div className="grid gap-2">
              {dataToShow.content.map((section, sectionIndex) => {
                return (
                  <div key={sectionIndex}>
                    <p>{section.paragraph}</p>
                    {section.list && (
                      <ul className="pl-8 list-disc">
                        {section.list.map((dot, listIndex) => {
                          return <li key={listIndex}>{dot}</li>;
                        })}
                      </ul>
                    )}
                    {section.image && (
                      <div className="m-4 flex flex-col md:flex-row gap-4">
                        {section.image.map((img, imgIndex) => {
                          return (
                            <img
                              key={imgIndex}
                              src={img.src}
                              alt={img.alt}
                              className="h-full max-h-64 max-w-64"
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
