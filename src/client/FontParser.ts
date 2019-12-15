import CharData from "./CharData";
import ResourceMap from "./Engine/Resources/ResourceMap";
import TextAsset from "./Engine/Resources/Assets/TextAsset";

export default class FontParser
{
    public static HeaderSize = 4;

    // Gets the value after an equal sign and converts it
    // from a string to an integer
    private static GetValue(s: string): number
    {
        let value = s.substr(s.indexOf("=") + 1);
        return parseInt(value);
    }

    public static Parse(filePath: string): { char: string, charData: CharData }
    {
        let charDictionary = {}; //  { char: string, charData: CharData }

        let fileContent = (ResourceMap.Instance.RetrieveAsset(filePath) as TextAsset).FileContent;
        let lines: string[] = fileContent.split("\n");

        for (let i = this.HeaderSize; i < lines.length; i++)
        {
            if (lines[i] === "") break;

            let firstLine = lines[i];
            let typesAndValues = firstLine.split(/(\s+)/).filter(
                (el) =>
                {
                    return el.trim().length > 0;
                });

            // All the data comes in a certain order,
            // used to make the parser shorter
            let charData = new CharData();
            charData.Id = this.GetValue(typesAndValues[1]);
            charData.X = this.GetValue(typesAndValues[2]);
            charData.Y = this.GetValue(typesAndValues[3]);
            charData.Width = this.GetValue(typesAndValues[4]);
            charData.Height = this.GetValue(typesAndValues[5]);
            charData.XOffset = this.GetValue(typesAndValues[6]);
            charData.YOffset = this.GetValue(typesAndValues[7]);
            charData.XAdvance = this.GetValue(typesAndValues[8]);

            charDictionary[charData.Id.toString()] = charData;
        }

        return charDictionary as  { char: string, charData: CharData };
    }
}