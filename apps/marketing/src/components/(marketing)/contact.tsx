import React from 'react';

import { Button } from '@documenso/ui/primitives/button';
import { Input } from '@documenso/ui/primitives/input';
import { Textarea } from '@documenso/ui/primitives/textarea';

import { WidgetContact } from './widget-contact';

function ContactContainer() {
  return (
    <>
      <WidgetContact className="!w-full">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input placeholder="Name" />
          <Input placeholder="Last Name" />
        </div>
        <Input placeholder="email" />
        <Textarea placeholder="message" />

        <Button type="submit">Send</Button>
      </WidgetContact>
    </>
  );
}

export default ContactContainer;
