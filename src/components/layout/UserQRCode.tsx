import { QRCodeCanvas } from "qrcode.react";
import React from "react";

type Props = {

    batchId: string;

};

const UserQRCode: React.FC<Props> = ({ batchId }) => {
  const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://autoidgen.com"}/user?batchCode=${batchId}`;
    console.log(qrUrl);
  return (
    <div className="flex w-auto flex-col items-center gap-2">
      <QRCodeCanvas
        value={qrUrl}
        size={128} // adjust size as needed
        bgColor="#ffffff"
        fgColor="#000000" // black
        level="H"
        includeMargin={true}
      />
      <p className="text-[10px] text-gray-500">Scan or tap to create new ID</p>
    </div>
  );
};

export default UserQRCode;
