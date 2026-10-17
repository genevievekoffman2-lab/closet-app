create policy "Owner insert" on items     for insert with check (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');
create policy "Owner update" on items     for update using (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');
create policy "Owner delete" on items     for delete using (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');

create policy "Owner insert" on tags      for insert with check (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');
create policy "Owner update" on tags      for update using (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');
create policy "Owner delete" on tags      for delete using (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');

create policy "Owner insert" on item_tags for insert with check (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');
create policy "Owner delete" on item_tags for delete using (auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');

create policy "Owner upload" on storage.objects for insert
  with check (bucket_id = 'item-images' and auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');
create policy "Owner delete" on storage.objects for delete
  using (bucket_id = 'item-images' and auth.uid() = '827b8821-ca82-4d79-adb0-332629a015ba');


